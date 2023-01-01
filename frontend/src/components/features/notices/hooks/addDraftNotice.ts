import axios from "axios";
import { NextRouter } from "next/router";
import toast from "react-hot-toast";
import { API_URL } from "../../../../config/constants";
import { isErrorMessage } from "../../../../utils/custom-errors";

axios.defaults.headers.common["Accept"] = "application/json";

export const addDraftNotice = async (
  noticeId: number,
  token: string,
  router: NextRouter
) => {
  if (window.confirm("下書きに戻しますか？")) {
    await axios
      .put(
        `${API_URL}/notices/${noticeId}/draft`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((e) => {
        if (
          axios.isAxiosError(e) &&
          e.response?.status === 401 &&
          isErrorMessage(e.response.data)
        ) {
          toast.error(e.response.data.message);
        } else if (
          axios.isAxiosError(e) &&
          e.response?.status === 404 &&
          isErrorMessage(e.response.data)
        ) {
          toast.error(e.response.data.message);
        }
        throw e;
      });
    toast.success("下書きに戻しました。");
    router.reload();
  }
};

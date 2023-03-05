import axios from "axios";
import { NextRouter } from "next/router";
import toast from "react-hot-toast";
import { API_URL } from "../../../../config/constants";
import {
  isErrorMessage,
  NotFoundError,
  UnauthorizedError,
} from "../../../../utils/custom-errors";

axios.defaults.headers.common["Accept"] = "application/json";

export const deleteNotice = async (
  noticeId: number,
  token: string,
  router: NextRouter
) => {
  if (window.confirm("本当に削除しますか？")) {
    await axios
      .delete(`${API_URL}/notices/${noticeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => {
        if (
          axios.isAxiosError(e) &&
          e.response?.status === 401 &&
          isErrorMessage(e.response.data)
        ) {
          throw new UnauthorizedError(e.response.data.errorMessage);
        } else if (
          axios.isAxiosError(e) &&
          e.response?.status === 404 &&
          isErrorMessage(e.response.data)
        ) {
          throw new NotFoundError(e.response.data.errorMessage);
        }
      });
    toast.success("削除しました🗑");
    router.reload();
  }
};

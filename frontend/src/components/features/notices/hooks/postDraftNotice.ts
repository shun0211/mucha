import axios from "axios";
import { NextRouter } from "next/router";
import toast from "react-hot-toast";
import { API_URL } from "../../../../config/constants";
import { TalkType } from "../../../../types";
import {
  isErrorMessage,
  isErrorMessages,
} from "../../../../utils/custom-errors";

axios.defaults.headers.common["Accept"] = "application/json";

export const postDraftNotice = async (
  token: string,
  title: string,
  scheduledAt: Date,
  repeat: boolean,
  monday: boolean,
  tuesday: boolean,
  wednesday: boolean,
  thursday: boolean,
  friday: boolean,
  saturday: boolean,
  sunday: boolean,
  message: string,
  talkType: TalkType,
  toLineId: string,
  router: NextRouter
) => {
  await axios
    .post(
      `${API_URL}/notices`,
      {
        title: title,
        scheduled_at: scheduledAt,
        repeat: repeat,
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday,
        sunday: sunday,
        message: message,
        status: "draft",
        talk_type: talkType,
        to_line_id: toLineId,
      },
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
        e.response?.status === 406 &&
        isErrorMessages(e.response.data)
      ) {
        e.response.data.messages.map((message) => toast.error(message));
      }
      throw e;
    });
  router.push("/notices");
  toast.success("下書きに登録しました😊");
};

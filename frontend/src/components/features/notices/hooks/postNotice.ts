import axios from "axios";
import { API_URL } from "../../../../config/constants";
import { Notice, TalkType } from "../../../../types";
import {
  isErrorMessage,
  isErrorMessages,
  NotAcceptableError,
  UnauthorizedError,
} from "../../../../utils/custom-errors";

axios.defaults.headers.common["Accept"] = "application/json";

export const postNotice = async (
  userId: number,
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
  status: string,
  talkType: TalkType,
  toLineId: string
): Promise<Notice> => {
  const res = await axios
    .post(
      `${API_URL}/notices`,
      {
        user_id: userId,
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
        status: status,
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
        throw new UnauthorizedError(e.response.data.errorMessage);
      } else if (
        axios.isAxiosError(e) &&
        e.response?.status === 406 &&
        isErrorMessages(e.response.data)
      ) {
        throw new NotAcceptableError(e.response.data.errorMessages);
      }
    });
  const notice: Notice = res?.data;
  return notice;
};

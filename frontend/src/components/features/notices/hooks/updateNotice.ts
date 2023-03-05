import axios from "axios";
import { API_URL } from "../../../../config/constants";
import { Notice } from "../../../../types";
import {
  isErrorMessage,
  isErrorMessages,
  NotAcceptableError,
  UnauthorizedError,
} from "../../../../utils/custom-errors";

axios.defaults.headers.common["Accept"] = "application/json";

export const updateNotice = async (
  noticeId: number,
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
  token: string
): Promise<Notice> => {
  const res = await axios
    .put(
      `${API_URL}/notices/${noticeId}`,
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
        status: status,
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

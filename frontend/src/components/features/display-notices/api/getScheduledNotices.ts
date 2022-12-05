import axios from "axios";
import { API_URL } from "../../../../config/constants";
import { Notice } from "../../../../types";

axios.defaults.headers.common["Accept"] = "application/json";

export const getScheduledNotices = async (
  userId: number,
  page = 1,
  perPage = 10
): Promise<Notice> => {
  const res = await axios.get(
    `${API_URL}/notices?userId=${userId}&page=${page}&perPage=${perPage}&status=scheduled`,
    { withCredentials: true }
  );
  return res.data;
};

import axios from "axios";
import useSWR from "swr";
import { API_URL } from "../config/constants";
import { UseNotices } from "./types";

axios.defaults.headers.common["Accept"] = "application/json";

const fetcher = (url: string, token: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

const useDraftNotices = (
  userId: number,
  token: string,
  page = 1,
  perPage = 10
): UseNotices => {
  const { data, error } = useSWR<UseNotices>(
    `${API_URL}/notices?userId=${userId}&page=${page}&perPage=${perPage}&status=draft`,
    (url) => fetcher(url, token)
  );

  return {
    notices: data ? data.notices : undefined,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useDraftNotices;

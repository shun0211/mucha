import axios from "axios";
import useSWR from "swr";
import { API_URL } from "../config/constants";
import { Notice } from "../types";
import { UseNotice } from "./types";

axios.defaults.headers.common["Accept"] = "application/json";

const fetcher = (url: string, token: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

const useNotice = (
  noticeId: number,
  token: string
): UseNotice => {
  const { data, error } = useSWR<Notice>(
    `${API_URL}/notices/${noticeId}`,
    (url) => fetcher(url, token)
  );

  return {
    notice: data ? data : undefined,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useNotice;

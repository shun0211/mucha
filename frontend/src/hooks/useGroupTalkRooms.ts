import axios from "axios";
import useSWR from "swr";
import { API_URL } from "../config/constants";
import { GroupTalkRoom } from "../types";

axios.defaults.headers.common["Accept"] = "application/json";

export type UseGroupTalkRooms = {
  groupTalkRooms?: GroupTalkRoom[];
  isLoading: boolean;
  isError: boolean;
};

const fetcher = (url: string, token: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

const useGroupTalkRooms = (token: string): UseGroupTalkRooms => {
  const { data, error } = useSWR<UseGroupTalkRooms>(
    `${API_URL}/group_talk_rooms`,
    (url) => fetcher(url, token)
  );

  return {
    groupTalkRooms: data ? data.groupTalkRooms : undefined,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useGroupTalkRooms;

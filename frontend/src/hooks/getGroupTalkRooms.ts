import axios from "axios";
import { API_URL } from "../config/constants";
import { GroupTalkRoom } from "../types";

axios.defaults.headers.common["Accept"] = "application/json";

const getGroupTalkRooms = async (token: string): Promise<GroupTalkRoom[]> => {
  const res = await axios.get(`${API_URL}/group_talk_rooms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.groupTalkRooms;
};

export default getGroupTalkRooms;

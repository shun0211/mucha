import axios from "axios";
import { API_URL } from "../config/constants";

axios.defaults.headers.common["Accept"] = "application/json";

export const addFriend = async (userId: number, token: string) => {
  await axios.put(
    `${API_URL}/users/${userId}/follow`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

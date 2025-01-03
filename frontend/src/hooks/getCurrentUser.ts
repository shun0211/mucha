import axios from "axios";
import { API_URL } from "../config/constants";
import { User } from "../types";

axios.defaults.headers.common["Accept"] = "application/json";

export const getCurrentUser = async (token: string): Promise<User> => {
  const res = await axios.get(`${API_URL}/current-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

import axios from "axios";
import { API_URL } from "../config/constants";

axios.defaults.headers.common["Accept"] = "application/json";

export const getLiffCostomToken = async (token: string | null): Promise<string> => {
  const res = await axios.get(`${API_URL}/liff/custom-token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

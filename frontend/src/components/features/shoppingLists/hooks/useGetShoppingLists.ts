import axios from "axios";
import useSWR from "swr";
import { ShoppingLists } from "../../../../types";
import { API_URL } from "../../../../config/constants";

axios.defaults.headers.common["Accept"] = "application/json";

type UseShoppingLists = {
  shoppingLists: ShoppingLists;
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

const useGetShoppingLists = (token: string) => {
  const { data, error } = useSWR<UseShoppingLists>(
    `${API_URL}/shopping_lists`,
    (url) => fetcher(url, token)
  );

  return {
    shoppingLists: data ? data.shoppingLists : undefined,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useGetShoppingLists;

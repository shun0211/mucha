import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../../../config/constants";
import { isErrorMessage } from "../../../../utils/custom-errors";

axios.defaults.headers.common["Accept"] = "application/json";

type doneShoppingList = {
  token: string;
  shoppingListId: number;
};

export const doneShoppingList = async ({
  token,
  shoppingListId,
}: doneShoppingList) => {
  await axios
    .put(
      `${API_URL}/shopping_lists/${shoppingListId}/done`,
      {},
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
        toast.error(e.response.data.errorMessage);
      } else if (
        axios.isAxiosError(e) &&
        e.response?.status === 404 &&
        isErrorMessage(e.response.data)
      ) {
        toast.error(e.response.data.errorMessage);
      }
      throw e;
    });
};

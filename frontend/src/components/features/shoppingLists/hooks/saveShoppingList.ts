import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../../../config/constants";
import { isErrorMessage } from "../../../../utils/custom-errors";

axios.defaults.headers.common["Accept"] = "application/json";

type saveShoppingListParams = {
  name: string;
  token: string;
  shoppingListId?: number;
};

export const saveShoppingList = async ({
  name,
  token,
  shoppingListId,
}: saveShoppingListParams) => {
  if (shoppingListId) {
    await axios
      .put(
        `${API_URL}/shopping_lists/${shoppingListId}`,
        { name: name },
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
  } else {
    await axios
      .post(
        `${API_URL}/shopping_lists`,
        { name: name },
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
  }
};

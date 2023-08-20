import React, { useState } from "react";
import { ShoppingList } from "../../../../types";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { saveShoppingList } from "../hooks/saveShoppingList";
import { set } from "react-hook-form";

type Props = {
  token: string;
  shoppingList: ShoppingList;
};

const ShoppingListRow: React.FC<Props> = ({ token, shoppingList }) => {
  const [name, setName] = useState<string>(
    shoppingList ? shoppingList.name : ""
  );

  return (
    <>
      <tr key={shoppingList ? shoppingList.id : 0}>
        <td></td>
        <td>
          <AiOutlineCheckCircle />
        </td>
        <td>
          <form>
            <input
              className="bg-transparent"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              onBlur={(e) => {
                if (shoppingList.id != 0) {
                  saveShoppingList({
                    name: e.target.value,
                    token: token,
                    shoppingListId: shoppingList.id,
                  });
                } else {
                  saveShoppingList({
                    name: e.target.value,
                    token: token,
                  });
                }
              }}
            />
          </form>
        </td>
        <td>{shoppingList ? shoppingList.createdAt : ""}</td>
      </tr>
    </>
  );
};

export default ShoppingListRow;

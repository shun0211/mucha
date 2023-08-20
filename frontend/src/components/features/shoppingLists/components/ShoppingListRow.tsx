import React, { useState } from "react";
import { ShoppingList } from "../../../../types";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { saveShoppingList } from "../hooks/saveShoppingList";
import { doneShoppingList } from "../hooks/doneShoppingList";
import { toast } from "react-hot-toast";

type Props = {
  token: string;
  shoppingList: ShoppingList;
};

const ShoppingListRow: React.FC<Props> = ({ token, shoppingList }) => {
  const [name, setName] = useState<string>(
    shoppingList ? shoppingList.name : ""
  );
  const [isDone, setIsDone] = useState<boolean>(shoppingList.isDone);

  return (
    <>
      <tr key={shoppingList ? shoppingList.id : 0}>
        <td></td>
        <td>
          {!isDone ? (
            <AiOutlineCheckCircle
              size={16}
              onClick={async () => {
                await doneShoppingList({
                  shoppingListId: shoppingList.id,
                  token: token,
                });
                setIsDone(true);
                toast.success("完了しました！");
              }}
            />
          ) : (
            <AiFillCheckCircle size={16} className="text-green" />
          )}
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

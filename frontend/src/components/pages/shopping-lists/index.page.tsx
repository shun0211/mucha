import React, { useContext, useEffect, useState } from "react";
import Header from "../../ui-elements/Header";
import NavigationBottom from "../../features/common/components/NavigationBottom";
import PageTitle from "../../ui-elements/PageTitle";
import { Table } from "@mantine/core";
import useGetShoppingLists from "../../features/shoppingLists/hooks/useGetShoppingLists";
import { AuthContext } from "../../../providers/AuthContext";
import ShoppingListRow from "../../features/shoppingLists/components/ShoppingListRow";
import { ShoppingList, ShoppingLists } from "../../../types";

const PagesShoppingLists = () => {
  const { token } = useContext(AuthContext);
  const [shoppingLists, setShoppingLists] = useState<ShoppingLists>([]);
  const { shoppingLists: initialShoppingLists } = useGetShoppingLists(token);

  useEffect(() => {
    if (!initialShoppingLists) return;

    setShoppingLists(initialShoppingLists);
  }, [initialShoppingLists]);

  const addShoppingListForm = () => {
    const newShoppingList: ShoppingList = {
      id: 0,
      name: "",
      isDone: false,
      doneAt: "",
      dispOrder: 0,
      createdAt: "",
      updatedAt: "",
      userId: 0,
    };
    setShoppingLists([...shoppingLists, newShoppingList]);
  };

  if (!shoppingLists) return null;

  return (
    <>
      <Header />
      <PageTitle>買い物リスト</PageTitle>
      <div className="mx-3">
        <Table verticalSpacing="xs" className="text-gray">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>買うもの</th>
              <th>追加日</th>
            </tr>
          </thead>
          <tbody>
            {shoppingLists &&
              shoppingLists.length > 0 &&
              shoppingLists.map((shoppingList) => {
                return (
                  <ShoppingListRow
                    key={shoppingList.id}
                    shoppingList={shoppingList}
                    token={token}
                  />
                );
              })}
            <tr key={0}>
              <td></td>
              <td></td>
              <td>
                <button
                  onClick={() => {
                    addShoppingListForm();
                  }}
                >
                  追加...
                </button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
      <NavigationBottom />
    </>
  );
};

export default PagesShoppingLists;

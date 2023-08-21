import React from "react";
import { Home, Plus, Settings } from "tabler-icons-react";
import NavigationBottomItem from "../NavigationBottomItem";
import { AiOutlineUnorderedList } from "react-icons/ai";

export const GeneralNavigationBottom = () => {
  return (
    <div className="grid grid-cols-4 w-full bottom-0 fixed bg-white shadow-inner">
      <NavigationBottomItem menu="ホーム" path="/notices">
        <Home size={26} strokeWidth={1} color={"black"} className="m-auto" />
      </NavigationBottomItem>
      <NavigationBottomItem menu="買い物リスト" path="/shopping-lists">
        <AiOutlineUnorderedList size={26} strokeWidth={1} color={"black"} className="m-auto" />
      </NavigationBottomItem>
      <NavigationBottomItem menu="追加" path="/notices/new">
        <Plus size={26} strokeWidth={1} color={"black"} className="m-auto" />
      </NavigationBottomItem>
      <NavigationBottomItem menu="設定" path="/setting">
        <Settings
          size={26}
          strokeWidth={1}
          color={"black"}
          className="m-auto"
        />
      </NavigationBottomItem>
    </div>
  );
};

export default GeneralNavigationBottom;

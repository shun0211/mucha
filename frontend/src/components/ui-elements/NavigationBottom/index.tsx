import React from "react";
import { Bell, Home, Plus, Settings } from "tabler-icons-react";
import NavigationBottomItem from "../NavigationBottomItem";

export const NavigationBottom = () => {
  return (
    <div className="grid grid-cols-4 w-full bottom-0 fixed bg-white shadow-inner">
      <NavigationBottomItem menu="ホーム" path="/notices">
        <Home size={30} strokeWidth={1} color={"black"} className="m-auto" />
      </NavigationBottomItem>
      <NavigationBottomItem menu="お知らせ" path="/notifications">
        <Bell size={30} strokeWidth={1} color={"black"} className="m-auto" />
      </NavigationBottomItem>
      <NavigationBottomItem menu="追加" path="/notices/new">
        <Plus size={30} strokeWidth={1} color={"black"} className="m-auto" />
      </NavigationBottomItem>
      <NavigationBottomItem menu="設定" path="/setting">
        <Settings
          size={30}
          strokeWidth={1}
          color={"black"}
          className="m-auto"
        />
      </NavigationBottomItem>
    </div>
  );
};

export default NavigationBottom;

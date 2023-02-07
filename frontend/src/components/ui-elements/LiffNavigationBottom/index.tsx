import React from "react";
import { Bell, Home, MessageCircle, Plus, Settings } from "tabler-icons-react";
import NavigationBottomItem from "../NavigationBottomItem";

export const LiffNavigationBottom = () => {
  return (
    <div className="grid grid-cols-5 w-full bottom-0 fixed bg-white shadow-inner">
      <NavigationBottomItem menu="ホーム" path="/notices">
        <Home size={26} strokeWidth={1} color={"black"} className="m-auto" />
      </NavigationBottomItem>
      <NavigationBottomItem menu="お知らせ" path="/notifications">
        <Bell size={26} strokeWidth={1} color={"black"} className="m-auto" />
      </NavigationBottomItem>
      <NavigationBottomItem menu="一斉送信" path="/multiple-send">
        <MessageCircle size={26} strokeWidth={1} color={"black"} className="m-auto" />
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

export default LiffNavigationBottom;

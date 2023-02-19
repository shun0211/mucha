import { Liff } from "@line/liff/dist/lib";
import React from "react";
import GeneralNavigationBottom from "../../../ui-elements/GeneralNavigationBottom";
import LiffNavigationBottom from "../../../ui-elements/LiffNavigationBottom";

const NavigationBottom = ({ liff }: { liff: Liff }) => {
  return liff.isApiAvailable("shareTargetPicker") ? (
    <LiffNavigationBottom />
  ) : (
    <GeneralNavigationBottom />
  );
};

export default NavigationBottom;

import React, { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthContext";
import GeneralNavigationBottom from "../../../ui-elements/GeneralNavigationBottom";
import LiffNavigationBottom from "../../../ui-elements/LiffNavigationBottom";

const NavigationBottom = () => {
  const { liff } = useContext(AuthContext);

  return liff!.isApiAvailable("shareTargetPicker") ? (
    <LiffNavigationBottom />
  ) : (
    <GeneralNavigationBottom />
  );
};

export default NavigationBottom;

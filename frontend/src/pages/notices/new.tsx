import { Liff } from "@line/liff/dist/lib";
import { NextPage } from "next";
import React from "react";
import PagesNoticesNew from "../../components/pages/notices/new.page";

const New: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  // eslint-disable-next-line react/prop-types
  liff,
}) => {
  return <PagesNoticesNew liff={liff} />;
};

export default New;

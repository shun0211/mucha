import { Select } from "@mantine/core";
import React from "react";
import { useNoticeTargetData } from "../../../hooks/useNoticeTargetData";

const NoticeTarget = () => {
  const noticeTargetData = useNoticeTargetData()
  if (!noticeTargetData) return null

  return (
    <>
      <Select
        label="💬 送付先"
        size="sm"
        data={noticeTargetData}
        defaultValue="DM"
        className="w-3/12"
      />
    </>
  );
};

export default NoticeTarget;

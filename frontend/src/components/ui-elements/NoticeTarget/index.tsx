import { Select } from "@mantine/core";
import React from "react";
import { useNoticeTargetData } from "../../../hooks/useNoticeTargetData";
import { User } from "../../../types";

const NoticeTarget = ({ user }: { user: User }) => {
  const noticeTargetData = useNoticeTargetData(user);
  if (!noticeTargetData) return null;

  return (
    <>
      <Select
        label="💬 送付先"
        size="sm"
        data={noticeTargetData}
        defaultValue={user.lineUserId}
        className="w-3/12"
      />
    </>
  );
};

export default NoticeTarget;

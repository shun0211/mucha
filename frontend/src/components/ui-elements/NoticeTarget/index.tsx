import { Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getNoticeTargetData } from "../../../hooks/getNoticeTargetData";
import { NoticeTargetData, User } from "../../../types";

const NoticeTarget = ({ user, token }: { user: User; token: string }) => {
  // カスタムフックにリファクタリングする
  const [noticeTargetData, setNoticeTargetData] =
    useState<NoticeTargetData | null>(null);
  useEffect(() => {
    const func = async () => {
      setNoticeTargetData(await getNoticeTargetData(user, token));
    };
    func();
  }, []);

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

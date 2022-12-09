import { Select } from "@mantine/core";
import React from "react";
import useGroupTalkRooms from "../../../hooks/useGroupTalkRooms";

const NoticeTarget = () => {
  const { groupTalkRooms } = useGroupTalkRooms();
  if (!groupTalkRooms) return null;

  const noticeTargetData = groupTalkRooms.map((groupTalkRoom) => {
    return { value: groupTalkRoom.lineGroupId, label: groupTalkRoom.lineName };
  });
  noticeTargetData.push({ value: "DM", label: "DM" });

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

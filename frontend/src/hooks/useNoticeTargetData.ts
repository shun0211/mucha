import { User } from "../types";
import useGroupTalkRooms from "./useGroupTalkRooms";

export const useNoticeTargetData = (user: User) => {
  const { groupTalkRooms } = useGroupTalkRooms();
  if (!groupTalkRooms) return null;

  const noticeTargetData = groupTalkRooms.map((groupTalkRoom) => {
    return { value: groupTalkRoom.lineGroupId, label: groupTalkRoom.lineName };
  });
  noticeTargetData.unshift({ value: user.lineUserId, label: "DM" });
  return noticeTargetData;
};

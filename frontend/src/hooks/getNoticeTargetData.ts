import { GroupTalkRooms, NoticeTargetData, User } from "../types";
import getGroupTalkRooms from "./getGroupTalkRooms";

export const getNoticeTargetData = async (user: User, token: string) => {
  const groupTalkRooms: GroupTalkRooms = await getGroupTalkRooms(token)
  if (!groupTalkRooms) return null;

  const noticeTargetData: NoticeTargetData = groupTalkRooms.map((groupTalkRoom) => {
    return { value: groupTalkRoom.lineGroupId, label: groupTalkRoom.lineName };
  });
  noticeTargetData.unshift({ value: user.lineUserId, label: "トーク" });

  return noticeTargetData;
};

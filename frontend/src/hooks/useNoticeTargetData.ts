import useGroupTalkRooms from "./useGroupTalkRooms";

export const useNoticeTargetData = () => {
  const { groupTalkRooms } = useGroupTalkRooms();
  if (!groupTalkRooms) return null;

  const noticeTargetData = groupTalkRooms.map((groupTalkRoom) => {
    return { value: groupTalkRoom.lineGroupId, label: groupTalkRoom.lineName };
  });
  noticeTargetData.unshift({ value: "DM", label: "DM" });
  return noticeTargetData
};

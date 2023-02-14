import { Tabs } from "@mantine/core";
import React from "react";
import useDraftNotices from "../../../../hooks/useDraftNotices";
import useScheduledNotices from "../../../../hooks/useScheduledNotices";
import useSentNotices from "../../../../hooks/useSentNotices";
import { GoogleCalendarNotice, Notice, User } from "../../../../types";
import GoogleCalendarNoticeCard from "./GoogleCalendarNoticeCard";
import NoticeCard from "./NoticeCard";

const DisplayNotices = ({ user, token }: { user: User; token: string }) => {
  const data = useScheduledNotices(user.id, token);
  const data2 = useDraftNotices(user.id, token);
  const data3 = useSentNotices(user.id, token);
  const scheduledNotices = data.notices ?? null;
  const draftNotices = data2.notices ?? null;
  const sentNotices = data3.notices ?? null;

  // この場合、スケルトンを出すように修正する
  if (!scheduledNotices) return null;
  if (!draftNotices) return null;
  if (!sentNotices) return null;

  return (
    <>
      <Tabs defaultValue="scheduled" color="yellow.0" className="my-2">
        <Tabs.List grow position="center">
          <Tabs.Tab value="scheduled">リマインド</Tabs.Tab>
          <Tabs.Tab value="draft">下書き</Tabs.Tab>
          <Tabs.Tab value="sent">送信済み</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="scheduled" pt="xs">
          {scheduledNotices.map((notice: Notice | GoogleCalendarNotice) => {
            // noticeType ではなく noticeStatus にしたい
            if ("schedule" in notice) {
              return <GoogleCalendarNoticeCard notice={notice} key={notice.id} />
            }
            return <NoticeCard notice={notice} key={notice.id} noticeType="scheduled" />;
          })}
        </Tabs.Panel>

        <Tabs.Panel value="draft" pt="xs">
          {draftNotices.map((notice: Notice) => {
            return <NoticeCard notice={notice} key={notice.id} noticeType="draft" />;
          })}
        </Tabs.Panel>

        <Tabs.Panel value="sent" pt="xs">
          {sentNotices.map((notice: Notice) => {
            return <NoticeCard notice={notice} key={notice.id} noticeType="sent" />;
          })}
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default DisplayNotices;

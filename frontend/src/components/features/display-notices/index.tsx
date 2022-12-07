import { Tabs } from "@mantine/core";
import React from "react";
import useDraftNotices from "../../../hooks/useDraftNotices";
import useScheduledNotices from "../../../hooks/useScheduledNotices";
import useSentNotices from "../../../hooks/useSentNotices";
import { Notice } from "../../../types";
import NoticeCard from "./components/NoticeCard";

const DisplayNotices = () => {
  const data = useScheduledNotices(1);
  const data2 = useDraftNotices(1);
  const data3 = useSentNotices(1);
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
          {scheduledNotices.map((notice: Notice) => {
            return <NoticeCard notice={notice} key={notice.id} />;
          })}
        </Tabs.Panel>

        <Tabs.Panel value="draft" pt="xs">
          {draftNotices.map((notice: Notice) => {
            return <NoticeCard notice={notice} key={notice.id} />;
          })}
        </Tabs.Panel>

        <Tabs.Panel value="sent" pt="xs">
          {sentNotices.map((notice: Notice) => {
            return <NoticeCard notice={notice} key={notice.id} />;
          })}
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default DisplayNotices;

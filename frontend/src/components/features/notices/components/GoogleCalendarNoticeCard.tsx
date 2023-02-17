import { Badge, Card, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "tabler-icons-react";
import { GoogleCalendarNotice } from "../../../../types";

const GoogleCalendarNoticeCard = ({
  notice,
}: {
  notice: GoogleCalendarNotice;
}) => {
  const [hiddened, setHiddened] = useState(true);

  return (
    <>
      <Card shadow="md" radius="xl" className="my-5">
        <Badge color="indigo" className="py-2 mb-1">Googleカレンダー</Badge>
        <Title order={4} className="py-1">
          {notice.schedule.title}
        </Title>
        <Text>予定 {notice.schedule.bookingDetail}</Text>
        <Text>通知日 {notice.scheduledDate}</Text>
        <Text>時間 {notice.scheduledTime}</Text>
        <ChevronDown
          size={36}
          strokeWidth={1}
          color={"black"}
          className={`m-auto ${hiddened ? "" : "hidden"}`}
          onClick={() => {
            setHiddened(false);
          }}
        />

        <div className={`${hiddened ? "hidden" : ""}`}>
          <Text fw={700}>メッセージ</Text>
          <Text className="whitespace-pre-wrap">{notice.message}</Text>
          <ChevronUp
            size={36}
            strokeWidth={1}
            color={"black"}
            className="m-auto"
            onClick={() => {
              setHiddened(true);
            }}
          />
        </div>
      </Card>
    </>
  );
};

export default GoogleCalendarNoticeCard;

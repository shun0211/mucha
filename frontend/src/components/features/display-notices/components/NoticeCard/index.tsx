import { Badge, Card, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "tabler-icons-react";
import { Notice } from "../../../../../types";

type Props = {
  notice: Notice
};

const NoticeCard = (props: Props) => {
  const [hiddened, setHiddened] = useState(true);

  return (
    <>
      <Card shadow="md" radius="xl" className="my-5">
        <Badge color="indigo">Googleカレンダー</Badge>
        <Title order={4} className="py-1">
          {props.notice.title}
        </Title>
        <Text>次回通知日 {props.notice.scheduledDate}</Text>
        <Text>時間 {props.notice.scheduledTime}</Text>
        <Text>繰り返し {props.notice.repeatedWeeks}</Text>
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
          <Text className="whitespace-pre-wrap">{props.notice.message}</Text>
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

export default NoticeCard;

import { Card, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { ChevronDown, ChevronUp } from "tabler-icons-react";
import { AuthContext } from "../../../../providers/AuthContext";
import { Notice, NoticeType } from "../../../../types";
import NoticeCardButtons from "./NoticeCardButtons";

type Props = {
  notice: Notice;
  noticeType: NoticeType;
};

const NoticeCard = ({ notice, noticeType }: Props) => {
  const [hiddened, setHiddened] = useState(true);
  const { token } = useContext(AuthContext);
  const router = useRouter();

  return (
    <>
      <Card shadow="md" radius="xl" className="my-5">
        {/* <Badge color="indigo">Googleカレンダー</Badge> */}
        <Title order={4} className="py-1">
          {notice.title}
        </Title>
        <Text>次回通知日 {notice.scheduledDate}</Text>
        <Text>時間 {notice.scheduledTime}</Text>
        <Text>繰り返し {notice.repeatedWeeks}</Text>
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

        <NoticeCardButtons
          noticeType={noticeType}
          noticeId={notice.id}
          token={token}
          router={router}
        />
      </Card>
    </>
  );
};

export default NoticeCard;

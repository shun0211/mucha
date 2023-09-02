import { Button } from "@mantine/core";
import { NextRouter } from "next/router";
import React from "react";
import { NoticeType } from "../../../../types";
import { deleteNotice } from "../hooks/deleteNotice";

type Props = {
  noticeType: NoticeType;
  noticeId: number;
  token: string;
  router: NextRouter;
};

const NoticeCardButtons = ({ noticeType, noticeId, token, router }: Props) => {
  // eslint-disable-next-line no-undef
  const Buttons = (): JSX.Element | null => {
    return (
      <div className="grid grid-cols-2">
        <Button
          color="yellow"
          className="text-black mx-1 h-12 whitespace-pre-wrap"
          size="md"
          type="button"
          radius="md"
          onClick={() => router.push(`/notices/${noticeId}/edit`)}
        >
          編集する
        </Button>
        <Button
          color="red"
          className="text-white mx-1 h-12"
          size="lg"
          type="button"
          radius="md"
          onClick={() => deleteNotice(noticeId, token, router)}
        >
          削除する
        </Button>
      </div>
    );
  };

  return <Buttons />;
};

export default NoticeCardButtons;

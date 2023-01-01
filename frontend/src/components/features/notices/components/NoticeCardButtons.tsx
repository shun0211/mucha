import { Button } from "@mantine/core";
import { NextRouter } from "next/router";
import React from "react";
import { NoticeType } from "../../../../types";
import { deleteNotice } from "../hooks/deleteNotice";
import { putDraftNotice } from "../hooks/putDraftNotice";
import { putScheduledNotice } from "../hooks/putScheduledNotice";

type Props = {
  noticeType: NoticeType;
  noticeId: number;
  token: string;
  router: NextRouter;
};

const NoticeCardButtons = ({ noticeType, noticeId, token, router }: Props) => {
  // eslint-disable-next-line no-undef
  const Buttons = (): JSX.Element | null => {
    if (noticeType === "scheduled") {
      return (
        <div className="grid grid-cols-2">
          <Button
            color="gray.6"
            className="text-white mx-1 h-12"
            size="md"
            type="button"
            radius="md"
            onClick={() => putDraftNotice(noticeId, token, router)}
          >
            下書きに戻す
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
    } else if (noticeType === "draft") {
      return (
        <div className="grid grid-cols-2">
          <Button
            color="yellow"
            className="text-black mx-1 h-12 whitespace-pre-wrap"
            size="md"
            type="button"
            radius="md"
            onClick={() => putScheduledNotice(noticeId, token, router)}
          >
            {`リマインドする`}
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
    } else if (noticeType === "sent") {
      return null;
    } else {
      throw Error;
    }
  };

  return <Buttons />;
};

export default NoticeCardButtons;

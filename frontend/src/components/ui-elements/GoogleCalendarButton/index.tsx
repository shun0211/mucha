import { Liff } from "@line/liff/dist/lib";
import { Button } from "@mantine/core";
import axios from "axios";
import React from "react";
import { API_URL, FRONT_URI } from "../../../config/constants";
import Image from "next/image";

const GoogleCalendarButton = ({
  liff,
  token,
}: {
  liff: Liff | null;
  token: string;
}) => {
  const syncCalendar = async () => {
    const res = await axios.get(`${API_URL}/google_calendar/authorize`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const redirectUrl = res.data.redirectUrl;
    window.location.href = `${redirectUrl}?test=aaa`;
  };

  if (!liff) return null;

  return (
    <>
      <Button
        className="bg-white text-black hover:bg-slate-50"
        leftIcon={
          <Image
            src="/google_calendar_icon.png"
            alt="Google Calendar Icon"
            width={30}
            height={30}
          />
        }
        onClick={() => {
          // ブラウザの403 dissallowed_useragent に引っかかるため LINE ブラウザではなく外部のブラウザを立ち上げる
          const context = liff.getContext();
          if (liff.isLoggedIn() && context?.type === "utou") {
            if (window.confirm("外部ブラウザへ移動します")) {
              liff.openWindow({
                url: `${FRONT_URI}/notices`,
                external: true,
              });
            }
          } else {
            if (window.confirm("開発中の機能のため警告画面が出ます")) {
              syncCalendar();
            }
          }
        }}
      >
        Googleカレンダーから予定を取得
      </Button>
    </>
  );
};

export default GoogleCalendarButton;

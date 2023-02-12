import { Button } from "@mantine/core";
import axios from "axios";
import React from "react";
import { API_URL } from "../../../config/constants";

const GoogleCalendarButton = ({ token }: { token: string }) => {
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

  return (
    <>
      <Button
        className="bg-blue-500 text-white"
        onClick={() => {
          if (window.confirm('開発中の機能のため警告画面が出ます')) {
            syncCalendar();
          }
        }}
      >
        Googleカレンダーと連携
      </Button>
    </>
  );
};

export default GoogleCalendarButton;

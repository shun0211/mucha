import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import { Notice, User } from "../../../../types";
import useScheduledNotices from "../../../../hooks/useScheduledNotices";

const DisplayCalender = ({ user, token }: { user: User; token: string }) => {
  const data = useScheduledNotices(user.id, token);
  const scheduledNotices = data.notices ?? null;
  if (!scheduledNotices) return null;

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={jaLocale}
        events={scheduledNotices.map((notice: Notice) => {
          return { title: notice.title, start: notice.scheduledAt };
        })}
        contentHeight={"auto"}
        titleFormat={{ year: "numeric", month: "short" }}
        headerToolbar={{
          start: "title",
          center: "",
          end: "prev,next",
        }}
        height={50}
        dayCellClassNames="bg-white leading-3"
        dayMaxEvents={2}
        dayCellContent={(e) => e.dayNumberText.replace("日", "")}
      />
    </>
  );
};

export default DisplayCalender;

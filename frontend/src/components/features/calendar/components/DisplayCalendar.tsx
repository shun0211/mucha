import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import { User } from "../../../../types";
import useScheduledNotices from "../../../../hooks/useScheduledNotices";

type CalendarEvent = {
  title: string;
  start: string;
};

const DisplayCalender = ({ user, token }: { user: User; token: string }) => {
  const data = useScheduledNotices(user.id, token);
  const scheduledNotices = data.notices ?? null;
  if (!scheduledNotices) return null;

  const events: CalendarEvent[] = [];
  scheduledNotices.forEach((notice) => {
    // eslint-disable-next-line prefer-spread
    events.push.apply(
      events,
      notice.scheduledDatetimes.map((datetime) => {
        return { title: notice.title, start: datetime };
      })
    );
  });

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={jaLocale}
        events={events}
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

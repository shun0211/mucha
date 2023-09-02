import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";
import { Notice, User } from "../../../../types";
import useScheduledNotices from "../../../../hooks/useScheduledNotices";
import dayjs from "dayjs";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type CalendarEvent = {
  title: string;
  start: string;
};

const DisplayCalender = ({ user, token }: { user: User; token: string }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [todaysNotices, setTodaysNotices] = React.useState<Notice[]>([]);

  const data = useScheduledNotices(user.id, token);
  const scheduledNotices = data.notices ?? null;
  if (!scheduledNotices) return null;

  const events: CalendarEvent[] = [];
  scheduledNotices.forEach((notice) => {
    // eslint-disable-next-line prefer-spread
    events.push.apply(
      events,
      notice.scheduledDatetimes.map((datetime) => {
        return {
          title: notice.title,
          start: dayjs(datetime).format("YYYY-MM-DD"),
        };
      })
    );
  });

  const openModal = (date: Date) => {
    const tmpTodaysNotices = scheduledNotices.filter((notice) => {
      return new Date(notice.scheduledDate).getTime() === date.getTime();
    });

    if (tmpTodaysNotices.length > 0) {
      setTodaysNotices(tmpTodaysNotices);
      open();
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        {todaysNotices.length > 0 &&
          todaysNotices.map((notice) => {
            return (
              <div key={notice.id} className="flex">
                <p>{notice.title}</p>
                <p className="pl-3">{notice.scheduledTime}</p>
              </div>
            );
          })}
      </Modal>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
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
        dateClick={(selectionInfo) => {
          openModal(selectionInfo.date);
        }}
        eventClick={(e) => {
          if (e.event.start) {
            openModal(e.event.start);
          }
        }}
      />
    </>
  );
};

export default DisplayCalender;

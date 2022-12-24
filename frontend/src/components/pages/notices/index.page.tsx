import { Container } from "@mantine/core";
import React, { useContext } from "react";
import Header from "../../ui-elements/Header";
import PageTitle from "../../ui-elements/PageTitle";
import NavigationBottom from "../../ui-elements/NavigationBottom";
import GoogleCalendarButton from "../../ui-elements/GoogleCalendarButton";
import NoticeTarget from "../../ui-elements/NoticeTarget";
import DisplayCalender from "../../features/calendar/components/DisplayCalendar";
import { AuthContext } from "../../../providers/AuthContext";
import DisplayNotices from "../../features/notices/components/DisplayNotices";

const PagesNotices = () => {
  const { currentUser, token } = useContext(AuthContext);
  if (!currentUser) return null;

  return (
    <>
      <Header />
      {/* フッターの分を開けたいためmargin-bottom: 96pxとする */}
      <Container className="mb-24">
        <PageTitle>リマインド設定</PageTitle>

        <DisplayCalender user={currentUser} token={token} />
        <div className="flex justify-between items-center py-3">
          <GoogleCalendarButton />
          <NoticeTarget user={currentUser} token={token} />
        </div>
        <DisplayNotices user={currentUser} token={token} />
      </Container>
      <NavigationBottom />
    </>
  );
};

export default PagesNotices;

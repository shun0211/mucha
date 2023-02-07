import { Container } from "@mantine/core";
import React, { useContext } from "react";
import Header from "../../ui-elements/Header";
import PageTitle from "../../ui-elements/PageTitle";
// import GoogleCalendarButton from "../../ui-elements/GoogleCalendarButton";
import NoticeTarget from "../../ui-elements/NoticeTarget";
import DisplayCalender from "../../features/calendar/components/DisplayCalendar";
import { AuthContext } from "../../../providers/AuthContext";
import DisplayNotices from "../../features/notices/components/DisplayNotices";
import NavigationBottom from "../../features/common/components/NavigationBottom";

const PagesNotices = () => {
  const { currentUser, token } = useContext(AuthContext);
  if (!currentUser) return null;

  return (
    <>
      <Header />
      {/* フッターの分を開けたいためmargin-bottom: 96pxとする */}
      <Container className="mb-24">
        <PageTitle>リマインド一覧</PageTitle>

        <DisplayCalender user={currentUser} token={token} />
        <div className="flex justify-between items-center py-3">
          <div></div>
          {/* <GoogleCalendarButton /> */}
          <NoticeTarget user={currentUser} token={token} />
        </div>
        <DisplayNotices user={currentUser} token={token} />
      </Container>
      <NavigationBottom />
    </>
  );
};

export default PagesNotices;

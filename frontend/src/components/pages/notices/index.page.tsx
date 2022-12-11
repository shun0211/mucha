import { Container } from "@mantine/core";
import React, { useContext } from "react";
import Header from "../../ui-elements/Header";
import PageTitle from "../../ui-elements/PageTitle";
import NavigationBottom from "../../ui-elements/NavigationBottom";
import GoogleCalendarButton from "../../ui-elements/GoogleCalendarButton";
import NoticeTarget from "../../ui-elements/NoticeTarget";
import { useAuth0 } from "@auth0/auth0-react";
import DisplayCalender from "../../features/calendar/components/DisplayCalendar";
import { AuthContext } from "../../../providers/auth";
import DisplayNotices from "../../features/notices/components/DisplayNotices";

const PagesNotices = () => {
  const { currentUser } = useContext(AuthContext)
  const { user, isAuthenticated } = useAuth0();

  if (!currentUser) return null
  console.log(user, isAuthenticated)

  return (
    <>
      <Header />
      {/* フッターの分を開けたいためmargin-bottom: 96pxとする */}
      <Container className="mb-24">
        <PageTitle>リマインド設定</PageTitle>

        <DisplayCalender />
        <div className="flex justify-between items-center py-3">
          <GoogleCalendarButton />
          <NoticeTarget user={currentUser} />
        </div>
        <DisplayNotices />
      </Container>
      <NavigationBottom />
    </>
  );
};

export default PagesNotices;

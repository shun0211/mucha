import { Container } from "@mantine/core";
import React from "react";
import Header from "../../ui-elements/Header";
import PageTitle from "../../ui-elements/PageTitle";
import DisplayNotices from "../../features/display-notices";
import DisplayCalender from "../../features/display-calender";
import NavigationBottom from "../../ui-elements/NavigationBottom";
import GoogleCalendarButton from "../../ui-elements/GoogleCalendarButton";
import NoticeTarget from "../../ui-elements/NoticeTarget";

const PagesNotices = () => {
  return (
    <>
      <Header />
      {/* フッターの分を開けたいためmargin-bottom: 96pxとする */}
      <Container className="mb-24">
        <PageTitle>リマインド設定</PageTitle>

        <DisplayCalender />
        <div className="flex justify-between items-center py-3">
          <GoogleCalendarButton />
          <NoticeTarget />
        </div>
        <DisplayNotices />
      </Container>
      <NavigationBottom />
    </>
  );
};

export default PagesNotices;

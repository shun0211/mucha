import { Anchor, Container, Text } from "@mantine/core";
import React, { useContext } from "react";
import Header from "../../ui-elements/Header";
import PageTitle from "../../ui-elements/PageTitle";
import GoogleCalendarButton from "../../ui-elements/GoogleCalendarButton";
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
        <div className="flex justify-between items-end py-3">
          <div>
            <Text fz="xs">※ 開発中の機能のため警告画面が出ます</Text>
            <Text fz="xs" className="pb-1">
              &emsp;詳しくは
              <Anchor href="/help/google-calendar-linkage" target="_blank">
                こちら
              </Anchor>
              をご確認ください
            </Text>
            <GoogleCalendarButton token={token} />
          </div>
          <NoticeTarget user={currentUser} token={token} />
        </div>
        <DisplayNotices user={currentUser} token={token} />
      </Container>
      <NavigationBottom />
    </>
  );
};

export default PagesNotices;

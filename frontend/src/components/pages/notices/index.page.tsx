import { Container } from "@mantine/core";
import React, { useContext } from "react";
import Header from "../../ui-elements/Header";
import PageTitle from "../../ui-elements/PageTitle";
import GoogleCalendarButton from "../../ui-elements/GoogleCalendarButton";
import NoticeTarget from "../../ui-elements/NoticeTarget";
import DisplayCalender from "../../features/calendar/components/DisplayCalendar";
import { AuthContext } from "../../../providers/AuthContext";
import DisplayNotices from "../../features/notices/components/DisplayNotices";
import NavigationBottom from "../../features/common/components/NavigationBottom";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const PagesNotices = () => {
  const { currentUser, token, liff } = useContext(AuthContext);
  const router = useRouter();

  if (!currentUser) return null;

  if (router.query.googleCalendarLinkageSuccess === "true") {
    toast.success("Google カレンダー連携が成功しました✨");
  }

  return (
    <>
      <Header />
      {/* フッターの分を開けたいためmargin-bottom: 96pxとする */}
      <Container className="mb-24">
        <PageTitle>リマインド一覧</PageTitle>

        <DisplayCalender user={currentUser} token={token} />
        <div className="flex justify-between items-end py-3">
          <GoogleCalendarButton liff={liff} token={token} />
          <NoticeTarget user={currentUser} token={token} />
        </div>
        <DisplayNotices user={currentUser} token={token} />
      </Container>
      <NavigationBottom />
    </>
  );
};

export default PagesNotices;

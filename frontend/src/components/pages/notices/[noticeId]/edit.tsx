import { Container } from "@mantine/core";
import React from "react";
import NavigationBottom from "../../../features/common/components/NavigationBottom";
import EditNotice from "../../../features/notices/components/EditNotice";
import Header from "../../../ui-elements/Header";
import PageTitle from "../../../ui-elements/PageTitle";

const PagesNoticeNoticeIdEdit = () => {
  return (
    <>
      <Header />
      <PageTitle>リマインド編集</PageTitle>
      <Container className="pb-24">
        <EditNotice />
      </Container>
      <NavigationBottom />
    </>
  );
};

export default PagesNoticeNoticeIdEdit;

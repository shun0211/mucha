import React from "react";
import PageTitle from "../../ui-elements/PageTitle";
import Header from "../../ui-elements/Header";
import { Container } from "@mantine/core";
import CreateNotice from "../../features/create-notice";
import NavigationBottom from "../../ui-elements/NavigationBottom";

const PagesNoticesNew = () => {
  return (
    <>
      <Header />
      <PageTitle>リマインド作成</PageTitle>
      <Container className="pb-24">
        <CreateNotice />
      </Container>
      <NavigationBottom />
    </>
  );
};

export default PagesNoticesNew;

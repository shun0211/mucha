import React, { useContext } from "react";
import PageTitle from "../../ui-elements/PageTitle";
import Header from "../../ui-elements/Header";
import { Container } from "@mantine/core";
import CreateNotice from "../../features/create-notice";
import NavigationBottom from "../../ui-elements/NavigationBottom";
import { AuthContext } from "../../../providers/auth";

const PagesNoticesNew = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Header />
      <PageTitle>リマインド作成</PageTitle>
      <Container className="pb-24">
        <CreateNotice user={currentUser!} />
      </Container>
      <NavigationBottom />
    </>
  );
};

export default PagesNoticesNew;

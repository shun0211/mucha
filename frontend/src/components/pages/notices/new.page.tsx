import React, { useContext } from "react";
import PageTitle from "../../ui-elements/PageTitle";
import Header from "../../ui-elements/Header";
import { Container } from "@mantine/core";
import NavigationBottom from "../../ui-elements/NavigationBottom";
import { AuthContext } from "../../../providers/auth";
import CreateNotice from "../../features/notices/components/CreateNotice";

const PagesNoticesNew = () => {
  const { currentUser, token } = useContext(AuthContext);
  if (!currentUser) return null;

  return (
    <>
      <Header />
      <PageTitle>リマインド作成</PageTitle>
      <Container className="pb-24">
        <CreateNotice user={currentUser} token={token} />
      </Container>
      <NavigationBottom />
    </>
  );
};

export default PagesNoticesNew;

import React, { useContext } from "react";
import PageTitle from "../../ui-elements/PageTitle";
import Header from "../../ui-elements/Header";
import { Container } from "@mantine/core";
import { AuthContext } from "../../../providers/AuthContext";
import CreateNotice from "../../features/notices/components/CreateNotice";
import NavigationBottom from "../../features/common/components/NavigationBottom";

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

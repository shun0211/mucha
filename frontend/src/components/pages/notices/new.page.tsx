import React, { useContext } from "react";
import PageTitle from "../../ui-elements/PageTitle";
import Header from "../../ui-elements/Header";
import { Container } from "@mantine/core";
import { AuthContext } from "../../../providers/AuthContext";
import CreateNotice from "../../features/notices/components/CreateNotice";
import { Liff } from "@line/liff/dist/lib";
import Skeleton from "../Skeleton";
import { NextPage } from "next";
import NavigationBottom from "../../features/notices/components/NavigationBottom";
import { useRouter } from "next/router";

interface Props {
  liff: Liff | null;
}

// eslint-disable-next-line react/prop-types
const PagesNoticesNew: NextPage<Props> = ({ liff }) => {
  const { currentUser, token } = useContext(AuthContext);
  const router = useRouter()
  // ログインしていない場合、ログインページへリダイレクトする
  if (currentUser === null) {
    router.push("/signin")
    return null
  };

  if (liff === null) return <Skeleton />;

  return (
    <>
      <Header />
      <PageTitle>リマインド作成</PageTitle>
      <Container className="pb-24">
        <CreateNotice user={currentUser} token={token} />
      </Container>
      <NavigationBottom liff={liff} />
    </>
  );
};

export default PagesNoticesNew;

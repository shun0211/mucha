import { Container, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import Header from "../../../ui-elements/Header";
import PageTitle from "../../../ui-elements/PageTitle";

const PagesGoogleLoginError = () => {
  return (
    <>
      <Header />
      <PageTitle>Google ログインできない</PageTitle>
      <Container size={300}>
        <Text fz="md" className="whitespace-pre-wrap">
          {`LINE で開いたブラウザの場合、下のようにログインできない場合があります。Safari か Chrome で開いて再度お試しください。\n\nIphoneの場合、右下端のボタンから Safari で開くことができます。`}
        </Text>

        <Image
          src="/google-login-error.png"
          alt="google login error screen"
          width={300}
          height={100}
          className="mx-auto py-5"
        />
      </Container>
    </>
  );
};

export default PagesGoogleLoginError;

import { Container, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import Header from "../../../ui-elements/Header";
import PageTitle from "../../../ui-elements/PageTitle";

const PagesGoogleCalendarLinkage = () => {
  return (
    <>
      <Header />
      <PageTitle>Google カレンダー連携について</PageTitle>
      <Container size={300}>
        <Text fw={700} className="whitespace-pre-wrap">
          {`現在、Google の審査中のため以下の画面が表示されます。\n\n左下の「詳細」をクリックして「muchualchat.com (安全ではないページ)に移動」をクリックしてください。`}
        </Text>

        <Image
          src="/google-calendar-alert.png"
          alt="google calendar linkage note"
          width={300}
          height={100}
          className="mx-auto py-5"
        />
      </Container>
    </>
  );
};

export default PagesGoogleCalendarLinkage;

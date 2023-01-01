import { Container, Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import Header from "../../../ui-elements/Header";
import PageTitle from "../../../ui-elements/PageTitle";

const PagesGroupTalkLinkage = () => {
  return (
    <>
      <Header />
      <PageTitle>グループラインにメッセージを送る</PageTitle>
      <Container className="bg-white py-5">
        <div className="grid grid-cols-2">
          <div>
            <Title order={3}>STEP 1</Title>
            <Text fz="sm">
              メッセージを送信するグループラインに Mucha アカウントを招待する
            </Text>
          </div>
          <Image
            src="/sample/add-friend-screen.png"
            alt="add friend screen"
            width={200}
            height={100}
            className="mx-auto"
          />
        </div>
      </Container>

      <Container className="bg-light-yellow py-5">
        <Title order={3}>STEP 2</Title>
        <Text fz="sm">「今すぐ認証する」ボタンからログインして認証する</Text>
      </Container>

      <Container className="py-5">
        <div className="grid grid-cols-2">
          <div>
            <Title order={3}>STEP 3</Title>
            <Text fz="sm">
              送付先にグループライン名が出てくるようになるのでそれを選択して作成すればOK！
            </Text>
          </div>
          <Image
            src="/sample/destination-select.png"
            alt=""
            width={200}
            height={100}
          />
        </div>
      </Container>
    </>
  );
};

export default PagesGroupTalkLinkage;

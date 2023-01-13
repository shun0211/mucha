import React, { useContext } from "react";
import Header from "../components/ui-elements/Header";
import { Container, Text, Title } from "@mantine/core";
import Image from "next/image";
import SignupButton from "../components/ui-elements/Signup";
import { AuthContext } from "../providers/AuthContext";
import MainLinkButton from "../components/ui-elements/MainLinkButton";

export default function Home() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="bg-white">
      <Header />
      <Container className="py-2">
        <Title order={2} className="text-center">
          「忘れた」がなくなる！
        </Title>
        <Text fz="sm" className="whitespace-pre-wrap text-center py-2">
          {`覚えておくストレスがなくなる\n家族や恋人同士で使える便利なリマインドチャットツール`}
        </Text>
        <Text size="xs" className="whitespace-pre-line text-center">
          \無料でご利用いただけます/
        </Text>
        {currentUser == null ? (
          <SignupButton text="さっそく使ってみる！" />
        ) : (
          <MainLinkButton text="さっそく使ってみる！" src="/notices" />
        )}
      </Container>

      <Container className="bg-light-yellow py-2">
        <Title order={3} className="text-center py-2">
          Mucha(ミューチャ)とは？
        </Title>
        <Text fz="sm" className="whitespace-pre-wrap text-center py-2">
          {`リマインドの設定をすると\nLINEにメッセージを送信することができるツールです`}
        </Text>
        <Image
          src="/sample/mucha-usecase.png"
          alt="ユースケース"
          width={400}
          height={100}
          className="mx-auto"
        />
      </Container>

      <Container className="py-2">
        <Title order={3} className="text-center py-2">
          さっそくはじめよう！
        </Title>
        <SignupButton text="新規登録画面へ" />
      </Container>
    </div>
  );
}

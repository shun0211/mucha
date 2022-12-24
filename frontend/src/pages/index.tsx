import React from "react";
import LoginButton from "../components/ui-elements/LoginButton";
import Header from "../components/ui-elements/Header";
import { Container, Text, Title } from "@mantine/core";
import Image from "next/image";

export default function Home() {
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
        <LoginButton />
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
        />
      </Container>

      <Container className="py-2">
        <Title order={3} className="text-center py-2">
          さっそくはじめよう！
        </Title>
        <LoginButton />
      </Container>
    </div>
  );
}

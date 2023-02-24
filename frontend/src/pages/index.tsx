import React, { useContext } from "react";
import Header from "../components/ui-elements/Header";
import { Card, Container, List, Text, Title } from "@mantine/core";
import Image from "next/image";
import { AuthContext } from "../providers/AuthContext";
import MainLinkButton from "../components/ui-elements/MainLinkButton";
import AddFriendButton from "../components/ui-elements/AddFriendButton";
import { MoodSadDizzy } from "tabler-icons-react";
import Footer from "../components/ui-elements/Footer";

export default function Home() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="bg-white">
      <Header />
      <Container className="py-2">
        <Title order={2} className="text-center whitespace-pre-wrap">
          {`「忘れた」がなくなる！\nLINEリマインドツール`}
        </Title>
        <Text fz="md" className="whitespace-pre-wrap text-center py-2">
          覚えておくストレスがなくなる
        </Text>
        <Text size="xs" className="whitespace-pre-line text-center">
          \友だち追加はこちらから/
        </Text>
        <div className="grid grid-cols-2 my-2 items-center">
          <AddFriendButton />
          <Image
            src="/add-friend-qr-code.png"
            alt="友だち追加用のQRコード"
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>
      </Container>

      <Container className="bg-light-yellow py-2">
        <Title order={3} className="text-center py-2">
          Mucha(ミューチャ)とは？
        </Title>
        <Text fz="sm" className="whitespace-pre-wrap text-center py-2">
          {`リマインドの設定をすると\nLINEトークでリマインドすることができるツールです`}
        </Text>
        <Image
          src="/usecase.jpg"
          alt="ユースケース"
          width={400}
          height={100}
          className="mx-auto"
        />
      </Container>

      <Container className="bg-light-gray py-2">
        <Title order={3} className="text-center py-2">
          Mucha でできること
        </Title>
        <Card shadow="md" radius="lg" className="mt-2 mb-5">
          <Title order={5} className="text-center mt-3">
            LINE トーク画面から簡単リマインド設定
          </Title>
          <Image
            src="/how-to-use.jpg"
            alt="ユースケース"
            width={300}
            height={100}
            className="mx-auto my-2"
          />
          <Text
            fz="sm"
            c="gray.8"
            className="whitespace-pre-wrap text-center py-2"
          >
            {`LINE のトーク画面からカンタンに\nリマインドを設定`}
          </Text>

          <Title order={5} className="text-center mt-3">
            Google カレンダーとの連携
          </Title>
          <Image
            src="/google_calendar.png"
            alt="ユースケース"
            width={180}
            height={180}
            className="mx-auto"
          />
          <Text
            fz="sm"
            c="gray.8"
            className="whitespace-pre-wrap text-center py-2"
          >
            {`Google カレンダーと連携することで\n自動でリマインドを設定`}
          </Text>

          <Title order={5} className="text-center mt-3">
            毎朝の日程通知 (実装中)
          </Title>
          <Image
            src="/good-morning.jpg"
            alt="毎朝の日程通知"
            width={200}
            height={200}
            className="mx-auto my-2"
          />
          <Text
            fz="sm"
            c="gray.8"
            className="whitespace-pre-wrap text-center py-2"
          >
            {`毎朝その日の予定を送付できるので\n一日のスケジュールを思い出す時間を作れる`}
          </Text>
        </Card>
      </Container>

      <Container className="bg-light-yellow py-2">
        <Title order={3} className="text-center py-2">
          こんなお悩みありませんか？
        </Title>
        <Card shadow="md" radius="lg" className="mt-2 mb-5">
          <List size="sm" icon={<MoodSadDizzy />} className="px-3 py-2 font-semibold">
            <List.Item className="py-1">予定をすぐに忘れてしまう...</List.Item>
            <List.Item className="py-1">
              カレンダーに予定を入れていたのに見てなくてすっぽかしてしまった...
            </List.Item>
            <List.Item className="py-1">
              アプリ内で通知したいけど、関係ない通知が来るのでできれば通知オフにしたい...
            </List.Item>
          </List>
        </Card>
      </Container>

      <Container className="bg-light-gray py-2 text-center">
        <Title order={3} className="text-center py-2">
          ユーザーの声
        </Title>
        {/* Card コンポーネントの Padding を上書きしている */}
        <Card shadow="md" radius="lg" className="mt-2 mb-5 px-7 pb-5">
          <Image
            src="/woman.png"
            alt="ユーザーの声"
            width={100}
            height={100}
            className="mx-auto"
          />
          <Text fz="xs" fw="bold">20代 女性</Text>
          <Text fz="md" fw="bold" className="pt-3">予定を管理・把握できるようになった</Text>
          <Text fz="md" className="pt-1 text-left">
            LINEと連携されていることで 通知に気づきやすかったです。
            また、繰り返し機能があるなど機能性が高く、非常に重宝しています！
          </Text>
        </Card>
      </Container>

      <Container className="py-2">
        <Title order={3} className="text-center">
          さっそく体験しよう！
        </Title>
        <div className="grid grid-cols-2 my-3 items-center">
          <AddFriendButton />
          <Image
            src="/add-friend-qr-code.png"
            alt="友だち追加用のQRコード"
            width={150}
            height={150}
            className="mx-auto justify-self-center"
          />
        </div>
        <Text size="xs" className="whitespace-pre-line text-center">
          ブラウザからもお使いいただけます
        </Text>
        {currentUser == null ? (
          <MainLinkButton text="さっそく使ってみる！" src="/signin" />
        ) : (
          <MainLinkButton text="さっそく使ってみる！" src="/notices" />
        )}
      </Container>
      <Footer />
    </div>
  );
}

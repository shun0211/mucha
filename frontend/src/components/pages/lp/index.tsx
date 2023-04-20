import React, { useContext } from "react";
import { Card, Container, Divider, List, Text, Title } from "@mantine/core";
import Image from "next/image";
import { Bulb } from "tabler-icons-react";
import { AuthContext } from "../../../providers/AuthContext";
import LPHeader from "../../ui-elements/LP/Header";
import AddFriendButton from "../../ui-elements/AddFriendButton";
import MainLinkButton from "../../ui-elements/MainLinkButton";
import Footer from "../../ui-elements/Footer";
import { FaUserTimes } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { BiRadioCircleMarked } from "react-icons/bi";
import { IconContext } from "react-icons";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { RiUserVoiceFill } from "react-icons/ri";
import { RxTriangleDown } from "react-icons/rx";
import AddFriendSubButton from "../../ui-elements/AddFriendButton/AddFriendSubButton";

const heightStyle = {
  height: "calc(100vh - 500px)",
};
const dot: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(circle at center, orange 20%, transparent 20%)",
  backgroundPosition: "top right",
  backgroundRepeat: "repeat-x",
  backgroundSize: "1em 0.3em",
  paddingTop: ".4em",
};

const PagesLandingPage = () => {
  return (
    <div className="bg-background">
      <div className="h-[100vh] bg-primary relative">
        <LPHeader />
        <div className="pl-5">
          <Image
            src="/lp/LP-background-image.png"
            alt="MUCHA 背景画像"
            width={330}
            height={500}
            className="absolute top-8 right-0"
          />
          <div style={heightStyle}></div>
          {/* drop-shadow が効いていない */}
          <Text
            fz="xl"
            className="text-left font-bellota text-white !drop-shadow"
          >
            LINEで<span className="text-[#FFF7C3]">リマインド</span>生活
          </Text>
          <Image
            src="/lp/LP-title.png"
            alt="Mucha タイトル"
            width={300}
            height={100}
            className=""
          />
          <Text fz="md" className="text-left text-white">
            ミューチャ
          </Text>
        </div>
        <div className="grid grid-cols-4 my-2">
          {/* color と text 両方指定する必要がある */}
          <Divider
            size="xs"
            color="accent"
            className="col-span-3 text-accent"
          />
          <Divider size="md" color="accent" className="text-accent" />
        </div>
        <div className="pl-5">
          <Text size="md" className="text-left text-white py-1">
            いつも忙しいあなたへ
          </Text>
          <Text size="md" className="text-left text-white py-1">
            MUCHAのリマインドでスマートな1日を
          </Text>
          <Text size="md" className="text-left text-white py-1">
            LINEで利用できるリマインドツール
          </Text>
          <Image
            src="/lp/LP-add-friend-qr-code.png"
            alt="友だち追加用のQRコード"
            width={150}
            height={150}
            className="mx-auto"
          />
          <AddFriendButton />
        </div>
        <div className="h-4 w-full bg-accent absolute bottom-0"></div>
      </div>

      <Container className="bg-primary py-2">
        <Title
          order={3}
          className="text-center pt-8 pb-2 text-white font-semibold"
        >
          <span className="bg-white bg-opacity-10 py-1 px-3 rounded-lg">
            MUCHAのポイント
          </span>
        </Title>
        <Image
          src="/lp/LP-daredemo.png"
          alt="だれでも"
          width={300}
          height={100}
          className="mx-auto py-3 pt-6"
        />
        <Image
          src="/lp/LP-imasugu.png"
          alt="いますぐ"
          width={300}
          height={100}
          className="mx-auto py-3"
        />
        <Image
          src="/lp/LP-kantan.png"
          alt="かんたん"
          width={300}
          height={100}
          className="mx-auto py-3 pb-6"
        />
      </Container>

      <Container className="py-2">
        <Title
          order={3}
          className="text-center pt-8 pb-2 font-semibold text-light-black"
        >
          <span className="bg-shadow bg-opacity-10 py-1 px-3 rounded-lg">
            こんなお悩みありませんか？
          </span>
        </Title>
        <List size="md" icon={<FaUserTimes />} className="px-8 py-5">
          <List.Item className="py-2">
            ちょっとした要件を手軽にリマインドしたい
          </List.Item>
          <List.Item className="py-2">
            スケジュールアプリを見る習慣がなくて予定を見逃してしまう
          </List.Item>
          <List.Item className="py-2">
            スケジュールアプリでリマインド設定するのがめんどくさい
          </List.Item>
        </List>
      </Container>

      <div className="bg-primary text-white text-center py-0.5 text-lg">
        そんなあなたに...
      </div>

      <div className="py-10">
        <Title
          order={3}
          className="text-center pb-2 font-semibold text-light-black"
        >
          <span className="bg-shadow bg-opacity-10 py-1 px-3 rounded-lg">
            <Bulb className="inline" /> MUCHAでお悩みを解決
          </span>
        </Title>
        <Text
          className="underline decoration-[#C9BC9C] decoration-3 text-center text-orange pt-3"
          size="xl"
        >
          だれでも・いますぐ・かんたん
        </Text>
        <Text className="text-center py-3">に始められます！</Text>
        <Image
          src="/logo.png"
          alt="MUCHA ロゴ"
          width={100}
          height={100}
          className="mx-auto py-2"
        />
        <Image
          src="/lp/LP-title-black.png"
          alt="MUCHA タイトル"
          width={100}
          height={100}
          className="mx-auto pt-2"
        />
      </div>

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

      <div className="pt-10 pb-5">
        <Title
          order={3}
          className="text-center pb-2 font-semibold text-light-black"
        >
          <span className="bg-shadow bg-opacity-10 py-1 px-3 rounded-lg">
            <BsGearFill className="inline" /> 他にもこんな機能
          </span>
        </Title>
        <IconContext.Provider value={{ size: "2rem", color: "#545454" }}>
          <List size="md" icon={<BiRadioCircleMarked />} className="px-10 py-5">
            <List.Item className="py-2 text-xl">LINEでAIチャットbot</List.Item>
            <List.Item className="py-2 text-xl">LINEの一斉送信</List.Item>
            <List.Item className="py-2 text-xl">
              毎朝当日の予定一覧をLINEで送付
            </List.Item>
          </List>
        </IconContext.Provider>
      </div>

      <div className="bg-primary py-1.5">
        <Text className="text-white text-center">リマインド機能だけでなく</Text>
        <Text className="text-white text-center pt-1.5">
          <span style={dot}>便利な機能</span>が盛りだくさん
        </Text>
      </div>

      <div className="pt-3 pb-7 bg-[#E1E1E1]">
        <IconContext.Provider value={{ size: "1.5rem", color: "#DB7F58" }}>
          <TbTriangleInvertedFilled className="mx-auto" />
        </IconContext.Provider>
        <Title
          order={3}
          className="text-center pt-3 pb-2 text-light-black font-semibold"
        >
          ぜひお気軽にお試しください
        </Title>
        <Image
          src="/logo.png"
          alt="MUCHA ロゴ"
          width={100}
          height={100}
          className="mx-auto py-2"
        />
        <Image
          src="/lp/LP-title-black.png"
          alt="MUCHA タイトル"
          width={130}
          height={100}
          className="mx-auto pt-2"
        />
        <AddFriendSubButton />
      </div>

      <div className="py-10">
        <Title
          order={3}
          className="text-center pb-2 font-semibold text-light-black"
        >
          <span className="bg-shadow bg-opacity-10 py-1 px-3 rounded-lg">
            <RiUserVoiceFill className="inline" /> ユーザーの声
          </span>
        </Title>
        <div className="py-3">
          <Image
            src="/lp/LP-man.png"
            alt="ユーザーの声 (20代男性)"
            width={150}
            height={150}
            className="mx-auto"
          />
          <Text className="text-center pt-2 text-[#6C9EC6]">20代 男性</Text>
          <Text className="text-light-black bg-[#E1E1E1] p-2 m-5 rounded-lg">
            LINEで通知がくるので予定を忘れることが格段になくなりました。リマインド以外にもチャットボットが使えたりとても便利なツールだと思います。
          </Text>
        </div>

        <div className="py-3">
          <Image
            src="/lp/LP-woman.png"
            alt="ユーザーの声 (20代女性)"
            width={150}
            height={150}
            className="mx-auto"
          />
          <Text className="text-center pt-2 text-[#E887EA]">20代 女性</Text>
          <Text className="text-light-black bg-[#E1E1E1] p-2 m-5 rounded-lg">
            Googleカレンダーで予定を管理してましたが、ポップアップの通知をよく見逃していました。MUCHAを使用してからLINEで通知がくるので凄く安心しています。
          </Text>
        </div>

        <div className="py-3">
          <Image
            src="/lp/LP-man2.png"
            alt="ユーザーの声 (30代男性)"
            width={150}
            height={150}
            className="mx-auto"
          />
          <Text className="text-center pt-2 text-[#6C9EC6]">30代 男性</Text>
          <Text className="text-light-black bg-[#E1E1E1] p-2 m-5 rounded-lg">
            MUCHAはチャットで予定が登録できるので、新感覚かつ直感的にリマインド設定ができます。ですので毎日楽しくリマインド設定をさせて頂いております。
          </Text>
        </div>
      </div>

      <div className="py-8 bg-primary">
        <Title order={3} className="text-center text-white">
          だれでも・いますぐ・かんたん
        </Title>
        <Text className="text-center text-white">
          <RxTriangleDown className="inline" />
          ご登録はこちらから
          <RxTriangleDown className="inline" />
        </Text>
        <div className="border-x mx-10 py-3 my-2">
          <Image
            src="/lp/LP-title.png"
            alt="Mucha タイトル"
            width={200}
            height={100}
            className="mx-auto"
          />
          <Text fz="md" className="text-center text-white pt-1">
            ミューチャ
          </Text>
          <Image
            src="/lp/LP-add-friend-qr-code.png"
            alt="友だち追加用のQRコード"
            width={150}
            height={150}
            className="mx-auto my-5"
          />
          <AddFriendButton />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PagesLandingPage;

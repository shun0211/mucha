import React from "react";
import { Divider, List, Text, Title } from "@mantine/core";
import Image from "next/image";
import { Bulb } from "tabler-icons-react";
import LPHeader from "../../ui-elements/LP/Header";
import AddFriendButton from "../../ui-elements/AddFriendButton";
import Footer from "../../ui-elements/Footer";
import { FaUserTimes } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { BiRadioCircleMarked } from "react-icons/bi";
import { IconContext } from "react-icons";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { RiUserVoiceFill } from "react-icons/ri";
import { RxTriangleDown } from "react-icons/rx";
import AddFriendSubButton from "../../ui-elements/AddFriendButton/AddFriendSubButton";

const dotCSSClass =
  "relative pt-[5px] before:absolute before:content-[''] before:w-[0.2em] before:h-[0.2em] before:rounded-lg before:bg-orange before:top-0 before:left-1/2";
const triangle01: React.CSSProperties = {
  width: 0,
  height: 0,
  borderRight: "30px solid transparent",
  borderTop: "30px solid #4B7E7B",
};
const triangle02: React.CSSProperties = {
  width: 0,
  height: 0,
  borderRight: "30px solid transparent",
  borderTop: "30px solid #316966",
};
const triangle03: React.CSSProperties = {
  width: 0,
  height: 0,
  borderRight: "30px solid transparent",
  borderTop: "30px solid #305755",
};

const PagesLandingPage = () => {
  return (
    <div className="bg-background">
      <LPHeader />
      <div className="bg-primary">
        {/* ヘッダーとフッターで 4vh なので 96 vh とする */}
        <div className="h-[96vh] bg-primary relative max-w-[1440px] md:mx-auto">
          <div className="relative w-auto h-[42vh] md:h-[100vh] md:w-2/5 md:max-w-lg md:absolute md:right-10 md:bottom-0">
            <Image
              src="/lp/LP-background-image.png"
              alt="MUCHA 背景画像"
              layout="fill"
              objectFit="contain"
              className="pt-3"
            />
          </div>
          <div className="md:w-3/5 md:pl-10">
            {/* 背景画像の代わりに設置 */}
            <div className="h-[42vh] hidden md:block"></div>
            <div className="absolute pl-5" style={{ bottom: "54vh" }}>
              <Text className="text-left font-bellota text-white md:text-3xl">
                LINEで<span className="text-[#FFF7C3]">リマインド</span>生活
              </Text>
              <div className="relative w-[250px] h-[6vh] md:w-[500px] md:h-[100px]">
                <Image
                  src="/lp/LP-title.png"
                  alt="Mucha タイトル"
                  layout="fill"
                  objectFit="contain"
                  className="!w-auto"
                />
              </div>
              <Text className="text-left text-white md:text-xl">
                ミューチャ
              </Text>
            </div>
            <div className="grid grid-cols-4 my-2">
              {/* color と text 両方指定する必要がある */}
              <Divider
                size="xs"
                color="accent"
                className="col-span-3 text-accent mt-[1px]"
              />
              <Divider size="md" color="accent" className="text-accent" />
            </div>
            <div className="pl-5 md:flex">
              <div className="md:basis-9/12">
                <Text className="text-left text-white py-0.5 md:py-6 md:text-2xl">
                  いつも忙しいあなたへ
                </Text>
                <Text className="text-left text-white py-0.5 md:py-6 md:text-2xl">
                  MUCHAのリマインドでスマートな1日を
                </Text>
                <Text className="text-left text-white py-0.5 bg-white bg-opacity-10 rounded-md ml-[-2px] px-1 inline-block md:my-7 md:text-2xl">
                  LINEで利用できる
                  <span className="text-[#FFF7C3]">リマインド</span>
                  ツール
                </Text>
              </div>
              <div className="md:basis-3/12">
                <div className="relative w-auto" style={{ height: "20vh" }}>
                  <Image
                    src="/lp/LP-add-friend-qr-code.png"
                    alt="友だち追加用のQRコード"
                    layout="fill"
                    objectFit="contain"
                    className="mx-auto mt-4"
                  />
                </div>
                <AddFriendButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[2vh] w-full bg-accent"></div>

      <div className="bg-primary pt-2 pb-5">
        <Title
          order={3}
          className="text-center pt-10 pb-2 text-white font-semibold"
        >
          <span className="bg-white bg-opacity-10 py-1 px-3 rounded-lg">
            MUCHAのポイント
          </span>
        </Title>
        <div className="max-w-[1044px] mx-auto md:flex md:pt-5">
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
        </div>
      </div>

      <div className="pt-2 pb-5 text-center">
        <Title order={3} className="pt-10 pb-2 font-semibold text-light-black">
          <span className="bg-shadow bg-opacity-10 py-1 px-3 rounded-lg">
            こんなお悩みありませんか？
          </span>
        </Title>
        <List
          size="md"
          icon={<FaUserTimes className="mt-[3px]" />}
          className="px-8 py-5 md:inline-block"
        >
          <List.Item className="py-2 text-left">
            ちょっとした要件を手軽にリマインドしたい
          </List.Item>
          <List.Item className="py-2 text-left">
            スケジュールアプリを見る習慣がなくて予定を見逃してしまう
          </List.Item>
          <List.Item className="py-2 text-left">
            スケジュールアプリでリマインド設定するのがめんどくさい
          </List.Item>
        </List>
      </div>

      <div className="bg-primary text-white text-center py-0.5 text-lg">
        そんなあなたに...
      </div>

      <div className="pt-2 pb-10 text-center">
        <Title
          order={3}
          className="text-center pb-2 pt-10 font-semibold text-light-black"
        >
          <span className="bg-shadow bg-opacity-10 py-1 px-3 rounded-lg">
            <Bulb className="inline" /> MUCHAでお悩みを解決
          </span>
        </Title>
        <Text
          className="decoration-3 align-middle text-orange pt-3 relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-[#C9BC9C] after:bottom-0 after:left-0 after:shadow-[0_0_2px_rgba(0,0,0,0.4)] after:opacity-60"
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

      <div className="bg-primary">
        <div className="grid grid-cols-12">
          <div className="col-span-1 bg-[#4B7E7B] pt-10"></div>
          <Title
            order={3}
            className="text-center font-semibold text-white col-span-11 pb-5 pt-10 pr-[8.3%]"
          >
            <span className="bg-white bg-opacity-10 py-1 px-3 rounded-lg">
              <BsGearFill className="inline" /> 使いやすい3つの機能
            </span>
          </Title>
        </div>

        <div className="grid grid-cols-12 bg-[#4B7E7B] py-3">
          <div className="col-span-1 bg-[#4B7E7B]"></div>
          <div className="col-span-11 flex">
            <div className="text-6xl text-white">01</div>
            <div className="border-l-2 mx-3"></div>
            <div className="md:flex md:items-center">
              <Text className="text-[#FFF7C3] text-2xl md:text-4xl">
                AIチャットで
              </Text>
              <Text className="text-white text-2xl md:text-4xl">
                リマインド登録
              </Text>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-1 bg-[#4B7E7B]"></div>
          <div style={triangle01}></div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-1 bg-[#4B7E7B]"></div>
          <div className="col-span-11 pb-12 pt-3 max-w-[1000px] mx-auto md:flex md:items-center">
            <Image
              src="/lp/LP-ai-remind.png"
              alt="AIチャットでリマインド登録"
              width={200}
              height={100}
              className="mx-auto my-2"
            />
            <Text className="text-white bg-white bg-opacity-10 p-2 m-5 rounded-lg h-fit md:w-[50%]">
              トーク画面で『〜日〜時に〜に行く』と予定を入力すれば自動でリマインド設定を行ってくれます。(chatGPT搭載)
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-12 bg-[#316966] py-3">
          <div className="col-span-1 bg-[#316966]"></div>
          <div className="col-span-11 flex">
            <div className="text-6xl text-white">02</div>
            <div className="border-l-2 mx-3"></div>
            <div className="md:flex md:items-center">
              <Text className="text-[#FFF7C3] text-2xl md:text-4xl">
                Googleカレンダー連携
              </Text>
              <Text className="text-white text-2xl md:text-4xl">
                でリマインド設定
              </Text>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-1 bg-[#316966]"></div>
          <div style={triangle02}></div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-1 bg-[#316966]"></div>
          <div className="col-span-11 pb-12 pt-3 max-w-[1000px] mx-auto md:flex md:items-center">
            <Image
              src="/google_calendar.png"
              alt="Googleカレンダーアイコン"
              width={200}
              height={100}
              className="mx-auto m-7"
            />
            <Text className="text-white bg-white bg-opacity-10 p-2 m-5 rounded-lg h-fit md:w-[50%]">
              Googleカレンダーと連携させることで、カレンダーの予定を自動でリマインド通知することができます。
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-12 bg-[#305755] py-3">
          <div className="col-span-1 bg-[#305755]"></div>
          <div className="col-span-11 flex">
            <div className="text-6xl text-white">03</div>
            <div className="border-l-2 mx-3"></div>
            <div className="md:flex md:items-center">
              <Text className="text-[#FFF7C3] text-2xl md:text-4xl">
                メニューからかんたん
              </Text>
              <Text className="text-white text-2xl md:text-4xl">
                リマインド登録
              </Text>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-1 bg-[#305755]"></div>
          <div style={triangle03}></div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-1 bg-[#305755]"></div>
          <div className="col-span-11 pb-12 pt-3 max-w-[1000px] mx-auto md:flex md:items-center">
            <div className="flex mx-auto md:gap-10">
              <Image
                src="/lp/LP-richmenu.png"
                alt="メニューからリマインド登録"
                width={160}
                height={100}
                className="mx-auto m-7"
              />
              <Image
                src="/lp/LP-registration.png"
                alt="メニューからリマインド登録"
                width={160}
                height={100}
                className="mx-auto m-7"
              />
            </div>
            <Text className="text-white bg-white bg-opacity-10 p-2 m-5 rounded-lg h-fit md:w-[50%]">
              メニューからブラウザを立ち上げてかんたんにリマインドを登録することができます。
            </Text>
          </div>
        </div>
      </div>

      <div className="pt-2 pb-5 text-center">
        <Title order={3} className="pt-10 pb-2 font-semibold text-light-black">
          <span className="bg-shadow bg-opacity-10 py-1 px-3 rounded-lg">
            <BsGearFill className="inline" /> 他にもこんな機能
          </span>
        </Title>
        <IconContext.Provider value={{ size: "2rem", color: "#545454" }}>
          <List
            size="md"
            icon={<BiRadioCircleMarked />}
            className="px-10 py-5 md:inline-block"
          >
            <List.Item className="py-2 text-xl text-left">
              LINEでAIチャットbot
            </List.Item>
            <List.Item className="py-2 text-xl text-left">
              LINEの一斉送信
            </List.Item>
            <List.Item className="py-2 text-xl text-left">
              毎朝当日の予定一覧をLINEで送付
            </List.Item>
          </List>
        </IconContext.Provider>
      </div>

      <div className="bg-primary py-1.5 text-center md:flex md:justify-center">
        <Text className="text-white md:pt-1.5">リマインド機能だけでなく</Text>
        <Text className="text-white pt-1.5">
          <span className={dotCSSClass}>便</span>
          <span className={dotCSSClass}>利</span>
          <span className={dotCSSClass}>な</span>
          <span className={dotCSSClass}>機</span>
          <span className={dotCSSClass}>能</span>が盛りだくさん
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

      <div className="pt-2 pb-5">
        <Title
          order={3}
          className="text-center pb-2 pt-10 font-semibold text-light-black"
        >
          <span className="bg-shadow bg-opacity-10 py-1 px-3 rounded-lg">
            <RiUserVoiceFill className="inline" /> ユーザーの声
          </span>
        </Title>
        <div className="py-3 max-w-xl mx-auto">
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

        <div className="py-3 max-w-xl mx-auto">
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

        <div className="py-3 max-w-xl mx-auto">
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
        <div className="border-x mx-10 py-3 my-2 max-w-3xl md:mx-auto">
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

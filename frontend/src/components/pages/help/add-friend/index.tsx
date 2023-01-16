import { Container, Text } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { OFFICIAL_ACCOUNT_LINE_ID } from "../../../../config/constants";
import Header from "../../../ui-elements/Header";
import MainLinkButton from "../../../ui-elements/MainLinkButton";
import PageTitle from "../../../ui-elements/PageTitle";

const PagesAddFriend = () => {
  const [isDownloadScript, setIsDownloadScript] = useState(false);
  const wrapper = useRef(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js";
    script.async = true;
    script.defer = true;
    (wrapper.current as any).appendChild(script);
    script.onload = () => {
      setIsDownloadScript(true);
    };
  }, []);

  useEffect(() => {
    const win = window as any;
    if (win.LineIt && isDownloadScript) {
      win.LineIt.loadButton();
    }
  }, [isDownloadScript]);

  return (
    <>
      <Header />
      <PageTitle>LINE 友だち追加</PageTitle>
      <Container>
        <Text fw={700} ta="center" className="whitespace-pre-line">
          {`新規登録ありがとうございました！
          通知を受け取るために、下記のボタンから「Mucha」公式アカウントを友だち追加してください。`}
        </Text>
        {/* 中央寄せするために仮の値として w-20 を設定 */}
        <div ref={wrapper} className="my-3 w-20 mx-auto">
          <div
            className="line-it-button"
            data-lang="ja"
            data-type="friend"
            data-env="REAL"
            data-lineId={OFFICIAL_ACCOUNT_LINE_ID}
            style={{ display: "none" }}
          ></div>
        </div>
        <Image
          src="/S_gainfriends_2dbarcodes_GW.png"
          alt="add friend screen"
          width={200}
          height={200}
          className="mx-auto my-5"
        />
        <Text size="md" className="whitespace-pre-line text-center pb-1">
          \ 友だち追加したら /
        </Text>
        <MainLinkButton src="/notices" text="さっそく使い始める" />
      </Container>
    </>
  );
};

export default PagesAddFriend;

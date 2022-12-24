import { Container, Text, Title } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { OFFICIAL_ACCOUNT_LINE_ID } from "../../../../config/constants";
import Header from "../../../ui-elements/Header";
import MainLinkButton from "../../../ui-elements/MainLinkButton";
import NavigationBottom from "../../../ui-elements/NavigationBottom";
import PageTitle from "../../../ui-elements/PageTitle";

const PagesLineAccountLinkage = () => {
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
      <PageTitle>※ LINEアカウント連携をしてください</PageTitle>
      <Container className="bg-light-yellow py-5">
        <div className="grid grid-cols-2">
          <div>
            <Title order={3}>STEP 1</Title>
            <Text fz="sm">LINE友だち登録をする</Text>
            {/* 友だち追加ボタン */}
            <div ref={wrapper} className="my-3">
              <div
                className="line-it-button"
                data-lang="ja"
                data-type="friend"
                data-env="REAL"
                data-lineId={OFFICIAL_ACCOUNT_LINE_ID}
                style={{ display: "none" }}
              ></div>
            </div>
          </div>
          <Image
            src="/sample/add-friend-screen.png"
            alt="add friend screen"
            width={200}
            height={100}
          />
        </div>
      </Container>

      <Container className="bg-white py-5">
        <Title order={3}>STEP 2</Title>
        <Text fz="sm">
          「今すぐアカウント連携する」ボタンからログインしたらアカウント連携が完了！
        </Text>
      </Container>

      <Container>
        <MainLinkButton src="/notices" text="さっそく使い始める" />
      </Container>
      <NavigationBottom />
    </>
  );
};

export default PagesLineAccountLinkage;

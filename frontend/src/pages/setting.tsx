/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Anchor, Card, Container, Space, Text } from "@mantine/core";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import NavigationBottom from "../components/features/common/components/NavigationBottom";
import Header from "../components/ui-elements/Header";
import PageTitle from "../components/ui-elements/PageTitle";
import { CONTACT_URL } from "../config/constants";
import { auth } from "../config/firebase";
import { AuthContext } from "../providers/AuthContext";

const Setting = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const handleLogout = async () => {
    signOut(auth);
    router.push("/signin");
    toast.success("ログアウトしました👋");
  };

  if (!currentUser) return null;

  return (
    <>
      <Header />
      <Container>
        <PageTitle>アカウント連携設定</PageTitle>
        <div className="bg-line-color text-center text-white p-1 font-bold rounded-xl">
          {currentUser!.isLineAccountLinkaged
            ? "LINEアカウント連携済"
            : "LINEアカウント未連携"}
        </div>

        <Space h="lg" />

        {currentUser!.isLineAccountLinkaged && (
          <Card shadow="md" radius="lg">
            <div className="flex">
              <Image
                src={currentUser!.lineProfileImageUrl}
                alt="Icon"
                width={70}
                height={70}
              />
              <Text fz="lg" fw={700} className="items-center flex pl-5">
                {currentUser!.lineName}
              </Text>
            </div>
          </Card>
        )}

        <Space h="lg" />
      </Container>

      <Container>
        <PageTitle>その他</PageTitle>
        <Anchor
          href={CONTACT_URL}
          className="border-y-gray-300 text-black border-t flex h-14 items-center cursor-pointer hover:bg-hover-color p-2"
        >
          問い合わせ
        </Anchor>
        <div
          onClick={handleLogout}
          className="border-y-gray-300 border-t flex h-14 items-center cursor-pointer hover:bg-hover-color p-2"
        >
          ログアウト
        </div>
      </Container>

      <NavigationBottom />
    </>
  );
};

export default Setting;

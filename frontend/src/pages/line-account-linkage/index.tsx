import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Header from "../../components/ui-elements/Header";
import LoginButton from "../../components/ui-elements/LoginButton";
import Skeleton from "../../components/ui-elements/Skeleton";
import { API_URL } from "../../config/constants";
import { AuthContext } from "../../providers/AuthContext";
import { TalkType } from "../../types";

const LineAccountLinkage: NextPage = () => {
  const router = useRouter();
  const linkToken = router.query.linkToken as string;
  const talkType = router.query.talkType as string;
  const lineGroupId = router.query.lineGroupId as TalkType;
  const { currentUser, token, authChecking } = useContext(AuthContext);

  // ログインのチェック中、スケルトンを表示
  if (authChecking) return <Skeleton />;

  // どこかのディレクトリに移動したい
  const createGroupTalkRoom = async (lineGroupId: string) => {
    await axios.post(
      `${API_URL}/group_talk_rooms`,
      { line_group_id: lineGroupId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const linkToLineAccount = async (linkToken: string): Promise<string> => {
    const res = await axios.post(
      `${API_URL}/line_bots/link`,
      { linkToken: linkToken },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.redirectUrl;
  };

  // TalkType が dm の場合、アカウント連携するAPIを叩く
  if (currentUser && talkType == "dm") {
    const inner = async () => {
      const redirectUrl = await linkToLineAccount(linkToken);
      window.location.href = redirectUrl;
    };
    inner();
  }

  // TalkType が groupTalk の場合、グループトークを作成するAPIを叩く
  if (currentUser && talkType == "groupTalk") {
    createGroupTalkRoom(lineGroupId);
    router.push("/line-account-linkage/success");
  }

  return (
    <>
      <Header />
      <LoginButton
        redirectUri={`line-account-linkage?talkType=${talkType}&lineGroupId=${lineGroupId}&linkToken=${linkToken}`}
      />
    </>
  );
};

export default LineAccountLinkage;

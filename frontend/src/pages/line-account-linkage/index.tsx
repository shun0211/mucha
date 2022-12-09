import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { API_DOMAIN, API_URL } from "../../config/constants";
import { AuthContext } from "../../providers/auth";
import { TalkType } from "../../types";

const LineAccountLinkage: NextPage = () => {
  const router = useRouter();
  const linkToken = router.query.linkToken;
  const talkType = router.query.talkType;
  // 型ガードに変更する
  const lineGroupId = router.query.lineGroupId as TalkType;
  const { currentUser } = useContext(AuthContext);

  // どこかのディレクトリに移動したい
  const createGroupTalkRoom = async (lineGroupId: string) => {
    await axios.post(
      `${API_URL}/group_talk_rooms`,
      { line_group_id: lineGroupId },
      { withCredentials: true }
    );
  };

  if (currentUser && talkType == "dm") {
    window.location.href = `${API_DOMAIN}/line_bot/link?linkToken=${linkToken}`;
  }

  if (currentUser && talkType == "groupTalk") {
    createGroupTalkRoom(lineGroupId)
    router.push('/line-account-linkage/success')
  }

  return <div>index</div>;
};

export default LineAccountLinkage;

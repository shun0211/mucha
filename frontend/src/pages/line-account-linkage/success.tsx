import { Container } from "@mantine/core";
import React from "react";
import Header from "../../components/ui-elements/Header";
import MainText from "../../components/ui-elements/MainText";
import MainLinkButton from "../../components/ui-elements/MainLinkButton";

const Success = () => {
  return (
    <div>
      <Header />
      <Container size={300} className="mt-5">
        <MainText>
          {`グループトークの登録に成功しました。
            グループトークにメッセージを送信できます😳`}
        </MainText>
        <MainLinkButton
          text="今すぐリマインドを設定する👆"
          src="/notices/new"
        />
      </Container>
    </div>
  );
};

export default Success;

import { Container } from "@mantine/core";
import React from "react";
import Header from "../../ui-elements/Header";
import MainText from "../../ui-elements/MainText";

export const PagesTemporaryComplete = () => {
  return (
    <div>
      <Header />
      <Container size={300} className="mt-5">
        <MainText
          text={`新規登録のメールを送付いたしました。
            メール内のURLをクリックしますと、新規登録が完了します。\n
            ※ メールの送付に5分ほどお時間がかかることがあります。`}
        />
      </Container>
    </div>
  );
};

export default PagesTemporaryComplete;

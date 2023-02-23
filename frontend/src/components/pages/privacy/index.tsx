import { Anchor, Container, List, Title } from "@mantine/core";
import React from "react";
import Header from "../../ui-elements/Header";
import MainText from "../../ui-elements/MainText";
import PageTitle from "../../ui-elements/PageTitle";

const PagesPrivacy = () => {
  return (
    <>
      <Header />
      <PageTitle>プライバシーポリシー</PageTitle>
      <Container size={350}>
        <MainText classNames="pb-2">
          Mucha
          運営者（以下、「当社」という。）は、ユーザーの個人情報について以下のとおりプライバシーポリシー（以下、「本ポリシー」という。）を定めます。本ポリシーは、当社がどのような個人情報を取得し、どのように利用・共有するか、ユーザーがどのようにご自身の個人情報を管理できるかをご説明するものです。
        </MainText>
        <Title order={5} className="pt-3">
          第一条 (個人情報の取得方法)
        </Title>
        <MainText classNames="py-2">
          当社は本サービスを利用時にユーザーの同意を得た上で以下の情報を取得させていただきます。
        </MainText>
        <List size="sm" type="ordered" className="list-disc py-2">
          <List.Item>
            LINE上で本オフィシャルアカウントと友だちとなる際に、LINE上でユーザーが許可することで取得可能となるプロフィール情報（ユーザーID(※)、プロフィール名、プロフィール写真）
          </List.Item>
          <List.Item>
            外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
          </List.Item>
        </List>
        <MainText classNames="py-2">
          ※ ユーザーIDは電話番号やLINE
          IDとは異なり、LINEプラットフォーム上で登録するプロバイダーごとに異なるユーザー識別用管理用の識別子です。
        </MainText>
        <Title order={5} className="pt-3">
          第二条 (個人情報の利用目的)
        </Title>
        <MainText classNames="py-2">
          当社は、取得したユーザー情報を以下の目的で利用する場合があります。
        </MainText>
        <List size="sm" type="ordered" className="list-disc py-2">
          <List.Item>本サービス利用の認証のため</List.Item>
          <List.Item>
            本サービスにおいて、リマインダーの通知や管理を目的とするサービス提供のため
          </List.Item>
          <List.Item>
            本サービスにおいて、サービス向上を目的とした調査・分析・改善のため
          </List.Item>
          <List.Item>
            本サービスに著しく影響を及ぼす事柄に関する連絡のため
          </List.Item>
          <List.Item>お客様からのお問い合わせに対応するため</List.Item>
          <List.Item>その他上記利用目的に準ずる目的のため</List.Item>
        </List>
        <Title order={5} className="pt-3">
          第三条 (個人データの第三者提供について)
        </Title>
        <MainText classNames="py-2">
          当社は法令及びガイドラインに別段の定めがある場合を除き、同意を得ないで第三者に個人情報を提供することは致しません。
        </MainText>
        <Title order={5} className="pt-3">
          第四条 (保有個人データの開示、訂正)
        </Title>
        <MainText classNames="py-2">
          当社は本人から個人情報の開示、訂正、削除を求められたときには、合理的な期間で本人に対しこれを対応します。ただし、個人情報保護法その他の法令により、当社が当該義務を負わない場合は、この限りではありません。
        </MainText>
        <Title order={5} className="pt-3">
          第五条 (ユーザー情報の安全管理措置)
        </Title>
        <MainText classNames="py-2">
          当社は、保有するユーザー情報につき、漏洩、滅失または毀損などを防止するため、一般的なWebサービスに求められる、必要なセキュリティ対策を実施しています。
        </MainText>
        <Title order={5} className="pt-3">
          第六条 (SSL（Secure Socket Layer）について)
        </Title>
        <MainText classNames="py-2">
          当社のWebサイトはSSLに対応しており、WebブラウザとWebサーバーとの通信を暗号化しています。ユーザーが入力する個人情報は自動的に暗号化されます。
        </MainText>
        <Title order={5} className="pt-3">
          第七条 (リンク)
        </Title>
        <MainText classNames="py-2">
          当社Webサイトへのリンクは、自由に設置していただいて構いません。ただし、Webサイトの内容等によってはリンクの設置をお断りすることがあります。
        </MainText>
        <Title order={5} className="pt-3">
          第八条 (プライバシーポリシーの変更)
        </Title>
        <MainText classNames="py-2">
          本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。
          当社が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。
        </MainText>
        <Title order={5} className="pt-3">
          第九条 (お問い合わせ窓口)
        </Title>
        <MainText classNames="py-2">
          本ポリシーに関するお問い合わせは、下記のお問い合わせフォームからお願いいたします。
        </MainText>
        <Anchor
          href="https://docs.google.com/forms/d/e/1FAIpQLScSpoeueQvIfuKQLKHzif0egM7-EuO2tfOJSIRul5GSGcjjSw/viewform"
          target="_blank"
        >
          お問い合わせはフォーム
        </Anchor>
      </Container>
    </>
  );
};

export default PagesPrivacy;
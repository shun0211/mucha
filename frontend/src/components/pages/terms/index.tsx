import { Container, List, Title } from "@mantine/core";
import React from "react";
import Header from "../../ui-elements/Header";
import MainText from "../../ui-elements/MainText";
import PageTitle from "../../ui-elements/PageTitle";

const PagesTerms = () => {
  return (
    <>
      <Header />
      <PageTitle>利用規約</PageTitle>
      <Container size={350}>
        <MainText classNames="pb-2">
          この利用規約（以下、「本規約」といいます。）は、Mucha
          運営者（以下、「当社」といいます。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って本サービスをご利用いただきます。
        </MainText>
        <Title order={5} className="pt-3">第一条 (適用)</Title>
        <MainText classNames="py-2">
          本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。当社は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。
        </MainText>
        <Title order={5} className="pt-3">第二条 (利用登録)</Title>
        <List size="sm" type="ordered" className="list-disc py-2">
          <List.Item>
            本サービスは、LINE
            上で本サービスのアカウントを友だち登録することで利用できます。また、ブラウザ上でLINE
            ログインを行うことでも利用ができます。
          </List.Item>
          <List.Item>本サービスのご利用は無料です。</List.Item>
          <List.Item>
            本サービスは、ユーザーが私的に使用する目的のみ利用するものとします。
          </List.Item>
        </List>
        <Title order={5} className="pt-3">第三条 (禁止事項)</Title>
        <MainText classNames="py-2">
          ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
        </MainText>
        <List size="sm" type="ordered" className="list-disc py-2">
          <List.Item>
            法令または公序良俗に違反する行為犯罪行為に関連する行為
          </List.Item>
          <List.Item>
            本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為
          </List.Item>
          <List.Item>
            当社、ほかのユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
          </List.Item>
          <List.Item>
            本サービスによって得られた情報を商業的に利用する行為
          </List.Item>
          <List.Item>当社のサービスの運営を妨害するおそれのある行為</List.Item>
          <List.Item>
            不正アクセスをし、またはこれを試みる行為他のユーザーに関する個人情報等を収集または蓄積する行為
          </List.Item>
          <List.Item>不正な目的を持って本サービスを利用する行為</List.Item>
          <List.Item>
            本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為他のユーザーに成りすます行為
          </List.Item>
          <List.Item>
            当社が許諾しない本サービス上での宣伝、広告、勧誘、または営業行為面識のない異性との出会いを目的とした行為
          </List.Item>
          <List.Item>
            当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
          </List.Item>
          <List.Item>その他、当社が不適切と判断する行為</List.Item>
        </List>
        <Title order={5} className="pt-3">第四条 (本サービスの提供の停止等)</Title>
        <MainText classNames="py-2">
          当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
        </MainText>
        <List size="sm" type="ordered" className="list-disc py-2">
          <List.Item>
            本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
          </List.Item>
          <List.Item>
            地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
          </List.Item>
          <List.Item>
            コンピュータまたは通信回線等が事故により停止した場合
          </List.Item>
          <List.Item>
            その他、当社が本サービスの提供が困難と判断した場合当社は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
          </List.Item>
        </List>
        <Title order={5} className="pt-3">第五条 (利用制限および登録抹消)</Title>
        <MainText classNames="py-2">
          当社は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
        </MainText>
        <List size="sm" type="ordered" className="list-disc py-2">
          <List.Item>本規約のいずれかの条項に違反した場合</List.Item>
          <List.Item>
            その他、当社が本サービスの利用を適当でないと判断した場合当社は、本条に基づき当社が行った行為によりユーザーに生じた損害について、一切の責任を負いません。
          </List.Item>
        </List>
        <Title order={5} className="pt-3">第六条 (保証の否認および免責事項)</Title>
        <MainText classNames="py-2">
          当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
        </MainText>
        <MainText classNames="py-2">
          当社は、本サービスに起因してユーザーに生じたあらゆる損害について、当社の故意又は重過失による場合を除き、一切の責任を負いません。
        </MainText>
        <MainText classNames="py-2">
          ただし、本サービスに関する当社とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
        </MainText>
        <MainText classNames="py-2">
          前項ただし書に定める場合であっても、当社は、当社の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当社またはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。
        </MainText>
        <MainText classNames="py-2">
          当社は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
        </MainText>
        <Title order={5} className="pt-3">第七条サービス内容の変更等)</Title>
        <List size="sm" type="ordered" className="list-disc py-2">
          <List.Item>
            当社は、当社が必要と判断する場合、事前の通知なく、本サービスを変更できるものとします。変更後はユーザーへの公開・提供開始をもってその効力を生じるものとし、ユーザーは変更後も本サービスの利用を続けることにより同意したものとみなされます。
            変更の内容をユーザーに個別に通知することはいたしかねますので、本サービスをご利用の際は、本サービスのお知らせをご参照ください。
          </List.Item>
          <List.Item>
            当社は、本条に基づき当社が行った行為によりユーザーに生じた損害について、一切の責任を負いません。
          </List.Item>
        </List>
        <Title order={5} className="pt-3">第八条 (利用規約の変更)</Title>
        <MainText classNames="py-2">
          当社は以下の場合には、事前の通知なく本規約を変更することができるものとします。変更後はユーザーへの公開をもってその効力を生じるものとします。
        </MainText>
        <List size="sm" type="ordered" className="list-disc py-2">
          <List.Item>
            本規約の変更がユーザーの一般の利益に適合するとき。
          </List.Item>
          <List.Item>
            本規約の変更が本サービス利用契約の目的に反せず、かつ変更の必要性、変更後の内容の相当性、その他の変更に係る事情に照らして合理的なものであるとき。
          </List.Item>
        </List>
        <Title order={5} className="pt-3">第九条 (個人情報の取り扱い)</Title>
        <MainText classNames="py-2">
          当社は、本サービスの利用によって取得する個人情報については、当社「プライバシーポリシー」に従い適切に取り扱うものとします。
        </MainText>
        <Title order={5} className="pt-3">第十条 (準拠法・裁判管轄)</Title>
        <MainText classNames="py-2">
          本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
        </MainText>
      </Container>
    </>
  );
};

export default PagesTerms;

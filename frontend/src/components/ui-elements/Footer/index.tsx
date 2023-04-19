import { Anchor, Container, Text } from "@mantine/core";
import React from "react";
import { CONTACT_URL } from "../../../config/constants";

const Footer = () => {
  return (
    <>
      <Container className="bg-accent text-center pt-3 pb-5">
        <Text color="#7E7E7E" fz="xl" fw="bold">
          MUCHA
        </Text>
        <Anchor href="/terms" className="text-[#545454] block pt-1" size="sm">
          利用規約
        </Anchor>
        <Anchor href="/privacy" className="text-[#545454] block pt-1" size="sm">
          プライバシーポリシー
        </Anchor>
        <Anchor
          href={CONTACT_URL}
          target="_blank"
          size="sm"
          className="text-[#545454] block pt-1"
        >
          お問い合わせ
        </Anchor>
        <Anchor
          href="https://sakaishun.com"
          target="_blank"
          size="sm"
          className="text-[#545454] block pt-1"
        >
          開発者ブログ
        </Anchor>
      </Container>
    </>
  );
};

export default Footer;

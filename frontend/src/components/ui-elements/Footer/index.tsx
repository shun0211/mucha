import { Anchor, Container, Text } from "@mantine/core";
import React from "react";
import { CONTACT_URL } from "../../../config/constants";

const Footer = () => {
  return (
    <>
      <Container className="bg-slate-600 text-center pt-3 pb-5">
        <Text color="white" fz="xl" fw="bold">
          Mucha
        </Text>
        <Anchor href={CONTACT_URL} target="_blank" className="text-white block">
          お問い合わせ
        </Anchor>
        <Anchor href="/terms" className="text-white block">
          利用規約
        </Anchor>
        <Anchor href="/privacy" className="text-white block">
          プライバシーポリシー
        </Anchor>
        <Anchor
          href="https://sakaishun.com"
          target="_blank"
          className="text-white block"
        >
          Blog
        </Anchor>
      </Container>
    </>
  );
};

export default Footer;

import React from "react";
import { Container, Title } from "@mantine/core";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <Container className="flex justify-center items-center my-3">
        <Image src="/logo-only-image.png" alt="logo" width={35} height={35} />
        <Title order={2} className="ml-3">
          Mucha
        </Title>
      </Container>
    </>
  );
};

export default Header;

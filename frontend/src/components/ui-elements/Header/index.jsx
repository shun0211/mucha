import React from "react";
import { Container, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <Container className="py-3">
        <Link href="/" className="flex justify-center items-center ">
          <Image src="/logo.png" alt="logo" width={35} height={35} />
          <Title order={2} className="ml-3">
            Mucha
          </Title>
        </Link>
      </Container>
    </>
  );
};

export default Header;

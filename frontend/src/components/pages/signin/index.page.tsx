import { Container, Text, Title } from "@mantine/core";
import Header from "../../ui-elements/Header";
import Image from "next/image";
import { handleLinelogin } from "../../../hooks/handleLineLogin";
import React from "react";

const PagesSignin = () => {
  return (
    <>
      <Header />
      <Title order={3} className="text-center pb-3">
        ようこそ！
      </Title>
      <Container>
        {/* Google ログインボタンを中央寄せにするために text-center が必要 */}
        <Image
          src="/login-screen-picture.png"
          alt="login screen picture"
          width={300}
          height={300}
          className="mx-auto"
        />
        <Text size="md" className="text-center pt-3 pb-1">
          \ ログインはこちらから /
        </Text>
        <div className="text-center">
          <button onClick={handleLinelogin}>
            <Image
              src="/btn_login_base.png"
              alt="LINE Login"
              width={191}
              height={40}
              className="mx-auto"
            />
          </button>
        </div>
      </Container>
    </>
  );
};

export default PagesSignin;

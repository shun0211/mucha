import {
  Card,
  Container,
  Divider,
  PasswordInput,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import Header from "../ui-elements/Header";
import PageTitle from "../ui-elements/PageTitle";
import Image from "next/image";
import MainButton from "../ui-elements/MainButton";
import { handleEmailAndPasswordSignin } from "../../hooks/handleEmailAndPasswordSignin";
import Link from "next/link";
import SubButton from "../ui-elements/SubButton";
import { useRouter } from "next/router";
import { handleGoogleLogin } from "../../hooks/handleGoogleLogin";

const PagesSignin = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });
  const [isWaiting, setIsWaitng] = useState<boolean>(false);

  return (
    <>
      <Header />
      <PageTitle>ログイン</PageTitle>
      <Container>
        <Card shadow="md" radius="lg" className="pb-8">
          <button onClick={() => handleGoogleLogin(router)}>
            <div className="m-auto">
              <Image
                src="/sample/btn_google_signin_light_normal_web.png"
                alt="Google Login"
                width={191}
                height={46}
              />
            </div>
          </button>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

          <form
            onSubmit={form.onSubmit((values) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              handleEmailAndPasswordSignin(
                values.email,
                values.password,
                setIsWaitng,
                router
              );
            })}
          >
            <TextInput
              required
              label="メールアドレス"
              placeholder="your@email.com"
              className="py-2"
              radius="lg"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              required
              label="パスワード"
              placeholder="パスワードを入力してください"
              className="py-2"
              radius="lg"
              {...form.getInputProps("password")}
            />

            <Space className="h-3" />

            <MainButton
              text="ログイン"
              type="submit"
              isWaiting={isWaiting}
              setIsWaiting={setIsWaitng}
            />
          </form>

          <Text align="center">アカウントをお持ちでない方</Text>

          <Link href="/signup">
            <SubButton text="新規登録" type="button" />
          </Link>
        </Card>
      </Container>
    </>
  );
};

export default PagesSignin;

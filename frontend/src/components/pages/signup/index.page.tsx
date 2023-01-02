import {
  Anchor,
  Card,
  Container,
  Divider,
  PasswordInput,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Help } from "tabler-icons-react";
import { handleEmailAndPasswordSignup } from "../../../hooks/handleEmailAndPasswordSignup";
import { handleGoogleLogin } from "../../../hooks/handleGoogleLogin";
import Attention from "../../ui-elements/Attention";
import Header from "../../ui-elements/Header";
import MainButton from "../../ui-elements/MainButton";
import PageTitle from "../../ui-elements/PageTitle";
import SubButton from "../../ui-elements/SubButton";

const PagesSignup = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  const [isWaiting, setIsWaitng] = useState<boolean>(false);

  return (
    <>
      <Header />
      <PageTitle>新規登録</PageTitle>
      <Container>
        <Card shadow="md" radius="lg" className="pb-8">
          <div className="text-center">
            <button onClick={() => handleGoogleLogin(router)}>
              <Image
                src="/sample/btn_google_signin_light_normal_web.png"
                alt="Google Login"
                width={191}
                height={46}
                className="mx-auto"
              />
            </button>
          </div>
          <div className="flex">
            <Help size={20} strokeWidth={2} color={"black"} className="pr-1" />
            <Text fz="xs">
              Google ログインできない場合は
              <Anchor href="/help/google-login-error" target="_blank">
                こちら
              </Anchor>
              をご確認ください
            </Text>
          </div>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

          <form
            onSubmit={form.onSubmit((values) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              handleEmailAndPasswordSignup(
                values.email,
                values.password,
                setIsWaitng
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
            <Attention text="※8文字以上の半角英数字" />

            <PasswordInput
              required
              label="パスワード確認"
              placeholder="もう一度パスワードを入力してください"
              className="py-2"
              radius="lg"
              {...form.getInputProps("passwordConfirmation")}
            />
            <Attention text="※8文字以上の半角英数字" />

            <Space className="h-3" />

            <MainButton
              text="新規登録"
              type="submit"
              isWaiting={isWaiting}
              setIsWaiting={setIsWaitng}
            />
          </form>

          <Text align="center">アカウントをお持ちの方</Text>

          <Link href="/signin">
            <SubButton text="ログイン" type="button" />
          </Link>
        </Card>
      </Container>
    </>
  );
};

export default PagesSignup;

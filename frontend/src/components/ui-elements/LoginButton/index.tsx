import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

const LoginButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/signin")}
      fullWidth
      className="bg-yellow text-black text-lg my-4 border-0"
    >
      ログイン
    </Button>
  );
};

export default LoginButton;

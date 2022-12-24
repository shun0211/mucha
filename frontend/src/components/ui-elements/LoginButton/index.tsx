import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect()}
      fullWidth
      className="bg-yellow text-black text-lg my-4 border-0"
    >
      ログイン
    </Button>
  );
};

export default LoginButton;

import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";
import React from "react";

type Props = {
  redirectUri?: string;
};

const LoginButton = (props: Props) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            redirect_uri: props.redirectUri,
          },
        })
      }
      fullWidth
      className="bg-yellow text-black text-lg my-4 border-0"
    >
      ログイン
    </Button>
  );
};

export default LoginButton;

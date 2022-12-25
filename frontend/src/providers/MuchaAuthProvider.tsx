import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import React, { ReactElement, useState } from "react";
import {
  AUTH0_AUDIENCE,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  FRONT_URI,
} from "../config/constants";
import { AuthProvider } from "./AuthProvider";

const MuchaAuthProvider = ({ children }: { children: ReactElement }) => {
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
        colors: {
          yellow: [
            "#FFDC00",
            "#FFDC00",
            "#FFDC00",
            "#FFDC00",
            "#FFDC00",
            "#FFDC00",
            "#FFDC00",
            "#FFDC00",
            "#FFDC00",
            "#FFDC00",
          ],
        },
      }}
    >
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        redirectUri={`${FRONT_URI}/notices`}
        audience={AUTH0_AUDIENCE}
      >
        <AuthProvider setAuthChecking={setAuthChecking} authChecking={authChecking}>
          {children}
        </AuthProvider>
      </Auth0Provider>
    </MantineProvider>
  );
};

export default MuchaAuthProvider;

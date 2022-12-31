import { MantineProvider } from "@mantine/core";
import React, { ReactElement, useState } from "react";
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
      <AuthProvider
        setAuthChecking={setAuthChecking}
        authChecking={authChecking}
      >
        {children}
      </AuthProvider>
    </MantineProvider>
  );
};

export default MuchaAuthProvider;

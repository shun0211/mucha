import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
          colors: {
            "yellow": [
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
        <Component {...pageProps} />
      </MantineProvider>
      <Toaster />
    </>
  );
}

import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head></Head>
        <body className="bg-bg-color">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

import { Card, Container, TextInput } from "@mantine/core";
import React, { useContext, useState } from "react";
import { FRONT_URI } from "../../../config/constants";
import { AuthContext } from "../../../providers/AuthContext";
import Header from "../../ui-elements/Header";
import MainButton from "../../ui-elements/MainButton";
import NavigationBottom from "../../ui-elements/NavigationBottom";
import PageTitle from "../../ui-elements/PageTitle";

const MultipleSend = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const { liff } = useContext(AuthContext);
  if (!liff) return null;
  console.log(liff);

  const selectDestinations = () => {
    console.log("in selectDestinations");
    if (!liff.isLoggedIn()) {
      liff.login({ redirectUri: `${FRONT_URI}/multiple-send` });
    } else {
      console.log("logind");
      console.log(liff.isApiAvailable("shareTargetPicker"));

      if (liff.isApiAvailable("shareTargetPicker")) {
        liff
          ?.shareTargetPicker(
            [
              {
                type: "text",
                text: "Hello, World!",
              },
            ],
            {
              isMultiple: true,
            }
          )
          .then(function (res) {
            if (res) {
              // succeeded in sending a message through TargetPicker
              console.log(`[${res.status}] Message sent!`);
            } else {
              // sending message canceled
              console.log("TargetPicker was closed!");
            }
          })
          .catch(function (error) {
            // something went wrong before sending a message
            console.log("something wrong happen");
            console.log(error);
          });
      }
    }
  };

  return (
    <>
      <Header />
      <PageTitle>メッセージ一斉送信</PageTitle>
      <Container>
        <Card shadow="md" radius="lg" className="pb-8">
          <TextInput placeholder="Your name" label="Full name" withAsterisk />
        </Card>
        <MainButton text="送信先を選択" type="button" onClick={selectDestinations} />
      </Container>
      <NavigationBottom />
    </>
  );
};

export default MultipleSend;

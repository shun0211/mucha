import { Container, Text, Title } from "@mantine/core";
import React from "react";
import NavigationBottom from "../../components/features/common/components/NavigationBottom";
import Header from "../../components/ui-elements/Header";

const Notifications = () => {
  return (
    <>
      <Header />
      <Container>
        <Title order={4} className="text-center">
          お知らせ
        </Title>
        <Text className="text-center pt-3">
          まだお知らせはありません
        </Text>
      </Container>
      <NavigationBottom />
    </>
  );
};

export default Notifications;

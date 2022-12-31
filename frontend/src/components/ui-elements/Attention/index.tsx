import { Text } from "@mantine/core";
import React from "react";

export const Attention = ({ text }: { text: string }) => {
  return (
    <Text size="xs" className="text-gray-500 pb-1">
      {text}
    </Text>
  );
};

export default Attention;

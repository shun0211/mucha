import { Button } from "@mantine/core";
import React from "react";

const AddFriendButton = () => {
  return (
    <Button
      component="a"
      target="_blank"
      href="https://lin.ee/QPiwqec"
      styles={(theme) => ({
        root: {
          backgroundColor: "#00B900",
          border: 0,
          height: 42,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 20,

          "&:hover": {
            backgroundColor: theme.fn.darken("#00B900", 0.05),
          },
        },
      })}
    >
      今すぐ友だち追加！
    </Button>
  );
};

export default AddFriendButton;

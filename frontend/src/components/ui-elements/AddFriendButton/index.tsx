import { Button } from "@mantine/core";
import React from "react";

const AddFriendButton = () => {
  return (
    <Button
      component="a"
      target="_blank"
      href="https://lin.ee/QPiwqec"
      className="block mx-auto mt-5"
      styles={(theme) => ({
        root: {
          backgroundColor: "#FFFFFF",
          border: 0,
          height: 42,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 20,
          color: "#65A7A3",
          width: "150px",

          "&:hover": {
            backgroundColor: theme.fn.darken("#65A7A3", 0.05),
            color: "#FFFFFF",
          },
        },
      })}
    >
      今すぐ友だち追加！
    </Button>
  );
};

export default AddFriendButton;

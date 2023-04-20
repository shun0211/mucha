import { Button } from "@mantine/core";
import React from "react";

const AddFriendSubButton = () => {
  return (
    <Button
      component="a"
      target="_blank"
      href="https://lin.ee/QPiwqec"
      className="block mx-auto mt-5 bg-primary"
      styles={(theme) => ({
        root: {
          backgroundColor: "#FFFFFF",
          border: 0,
          height: 42,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 20,
          color: "#FFFFFF",
          width: "150px",

          "&:hover": {
            backgroundColor: theme.fn.darken("#65A7A3", 0.05),
            color: "#FFFFFF",
          },
        },
      })}
    >
      友だち追加
    </Button>
  );
};

export default AddFriendSubButton;

import { Button } from "@mantine/core";
import React from "react";

type Props = {
  text: string;
  type: "button" | "reset" | "submit";
  isWaiting?: boolean;
  setIsWaiting?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DraftButton = (props: Props) => {
  const setIsWaiting = props.setIsWaiting;
  return (
    <Button
      fullWidth
      color="gray.6"
      className="text-white text-lg my-4 border-0"
      type={props.type}
      loading={props.isWaiting ?? false}
      radius="md"
      onClick={() => {
        if (setIsWaiting) {
          setIsWaiting(true);
        }
      }}
    >
      {props.text}
    </Button>
  );
};

export default DraftButton;

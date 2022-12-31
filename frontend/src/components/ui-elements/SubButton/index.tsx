import { Button } from "@mantine/core";
import React from "react";

type Props = {
  text: string;
  type: "button" | "reset" | "submit";
  isWaiting?: boolean;
  setIsWaiting?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubButton = (props: Props) => {
  const setIsWaiting = props.setIsWaiting;
  return (
    <Button
      fullWidth
      variant="outline"
      className="border-yellow text-black text-xl my-3 bg-white"
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

export default SubButton;

import { Button } from "@mantine/core";
import React from "react";

type Props = {
  text: string;
  type: "button" | "reset" | "submit";
  isWaiting?: boolean;
  setIsWaiting?: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const MainButton = (props: Props) => {
  const setIsWaiting = props.setIsWaiting;
  return (
    <Button
      fullWidth
      variant="outline"
      className="bg-yellow text-black text-lg my-4 border-0"
      type={props.type}
      loading={props.isWaiting ?? false}
      radius="md"
      onClick={(e: any) => {
        if (setIsWaiting) {
          setIsWaiting(true);
        }

        if (props.onClick) {
          props.onClick(e);
        }
      }}
    >
      {props.text}
    </Button>
  );
};

export default MainButton;

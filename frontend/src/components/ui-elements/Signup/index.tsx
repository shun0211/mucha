import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

const SignupButton = ({ text }: { text: string }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/signup")}
      fullWidth
      className="bg-yellow text-black text-lg mb-4 mt-2 border-0"
    >
      {text}
    </Button>
  );
};

export default SignupButton;

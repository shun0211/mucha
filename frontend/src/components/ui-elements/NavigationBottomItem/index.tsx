import { Button, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

export const NavigationBottomItem = ({
  children,
  menu,
  path,
}: {
  children: React.ReactNode;
  menu: string;
  path: string;
}) => {
  return (
    <Link href={path}>
      <Button variant="outline" className="h-16 w-full border-white" radius={0}>
        <div>
          {children}
          <Text color="black" weight={500} size="xs" className="text-center">
            {menu}
          </Text>
        </div>
      </Button>
    </Link>
  );
};

export default NavigationBottomItem;

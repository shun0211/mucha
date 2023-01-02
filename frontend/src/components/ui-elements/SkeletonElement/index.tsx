import { Skeleton as MantineSkeleton } from "@mantine/core";
import React from "react";

const SkeletonElement = () => {
  return (
    <>
      <MantineSkeleton height={8} radius="xl" mt={30} />
      <MantineSkeleton height={8} mt={10} radius="xl" />
      <MantineSkeleton height={8} mt={10} width="70%" radius="xl" />
    </>
  );
};

export default SkeletonElement;

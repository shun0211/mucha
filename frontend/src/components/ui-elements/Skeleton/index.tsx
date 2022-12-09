import { Container, Skeleton as MantineSkeleton } from "@mantine/core";
import React from "react";
import Header from "../Header";

const Skeleton = () => {
  return (
    <>
      <Header />
      <Container className="mt-5 mb-24 w-10/12">
        <MantineSkeleton height={8} radius="xl" mt={30} />
        <MantineSkeleton height={8} mt={10} radius="xl" />
        <MantineSkeleton height={8} mt={10} width="70%" radius="xl" />

        <MantineSkeleton height={8} radius="xl" mt={30} />
        <MantineSkeleton height={8} mt={10} radius="xl" />
        <MantineSkeleton height={8} mt={10} width="70%" radius="xl" />

        <MantineSkeleton height={8} radius="xl" mt={30} />
        <MantineSkeleton height={8} mt={10} radius="xl" />
        <MantineSkeleton height={8} mt={10} width="70%" radius="xl" />
      </Container>
    </>
  );
};

export default Skeleton;

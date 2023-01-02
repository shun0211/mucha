import { Container, Skeleton as MantineSkeleton } from "@mantine/core";
import React from "react";
import Header from "../../ui-elements/Header";
import SkeletonElement from "../../ui-elements/SkeletonElement";

const Skeleton = () => {
  return (
    <>
      <Header />
      <Container className="mt-5 mb-24 w-10/12">
        <SkeletonElement />
        <SkeletonElement />
        <SkeletonElement />
      </Container>
    </>
  );
};

export default Skeleton;

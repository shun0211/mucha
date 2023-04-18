import Image from "next/image";
import React from "react";

const LPHeader = () => {
  return (
    <>
      <header className="h-4 bg-accent">
        <Image
          src="/LP-header-title.png"
          alt="Mucha"
          width={130}
          height={60}
          className="pl-[15vw] pt-0.5"
        />
      </header>
    </>
  );
};

export default LPHeader;

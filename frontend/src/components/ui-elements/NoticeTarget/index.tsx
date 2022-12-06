import { Select } from "@mantine/core";
import React from "react";

const NoticeTarget = () => {
  return (
    <>
      <Select
        label="💬 送付先"
        size="sm"
        data={[
          {value: "DM", label: "DM"}
        ]}
        defaultValue="DM"
        className="w-3/12"
      />
    </>
  );
};

export default NoticeTarget;

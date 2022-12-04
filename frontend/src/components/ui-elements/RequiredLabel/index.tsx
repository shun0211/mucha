import { Text } from '@mantine/core';
import React from 'react'

type Props = {
  text: string;
};

const RequiredLabel = (props: Props) => {
  return (
    <Text className="text-sm text-zinc-800 pb-1">
      {props.text} <span className="text-red-500">*</span>
    </Text>
  )
}

export default RequiredLabel

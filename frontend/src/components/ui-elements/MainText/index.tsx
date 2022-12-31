import { Text } from '@mantine/core'
import React from 'react'

type Props = {
  text: string;
}

// 改行について考慮する
export const MainText = (props: Props) => {
  return (
    <Text size='sm' className='whitespace-pre-line'>
      {props.text}
    </Text>
  )
}

export default MainText

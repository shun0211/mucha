import { Text } from '@mantine/core'
import React, { ReactNode } from 'react'

// 改行について考慮する
export const MainText =  ({ children, classNames }: { children: ReactNode, classNames?: string }) => {
  return (
    <Text size='sm' className={`whitespace-pre-line ${classNames}`}>
      {children}
    </Text>
  )
}

export default MainText

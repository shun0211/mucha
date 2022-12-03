import { Title } from '@mantine/core'
import React, { ReactNode } from 'react'

const PageTitle = ({ children }: { children: ReactNode }) => {
  return (
    <Title order={4} className="text-center pb-5">
      {children}
    </Title>
  )
}

export default PageTitle

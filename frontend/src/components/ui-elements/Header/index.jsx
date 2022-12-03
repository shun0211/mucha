import React from 'react'
import { Container, Title } from '@mantine/core'
import Image from 'next/image'

const Header = () => {
  return (
    <>
      <Container className="flex justify-center items-center my-3">
        <Image
          src="/logo.jpeg"
          alt="logo"
          width={50}
          height={50}
        />
        <Title order={2} className="ml-3">Mucha</Title>
      </Container>
    </>
  )
}

export default Header

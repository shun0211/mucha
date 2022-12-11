import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mantine/core'
import React from 'react'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Button onClick={() => loginWithRedirect()}>ログイン</Button>
  )
}

export default LoginButton

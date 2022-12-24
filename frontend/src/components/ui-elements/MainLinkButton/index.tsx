import { Button } from '@mantine/core'
import { useRouter } from 'next/router';
import React from 'react'

type Props = {
  text: string;
  src: string;
}

const MainLinkButton = (props: Props) => {
  const router = useRouter()

  return (
    <Button
      fullWidth
      variant="outline"
      className="bg-yellow text-black text-lg my-4 border-0"
      radius="md"
      type="button"
      onClick={() => {
        router.push(props.src)
      }}
    >
      {props.text}
    </Button>
  )
}

export default MainLinkButton

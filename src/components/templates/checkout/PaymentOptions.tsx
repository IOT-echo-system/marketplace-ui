import React from 'react'
import {Stack} from '@mui/material'
import {useMedia} from '../../../hooks'

export const PaymentOptions: React.FC = () => {
  const media = useMedia()

  return (
    <Stack justifyContent={'space-around'} spacing={media.md ? 2 : 4}>
      <Stack>Payment options</Stack>
    </Stack>
  )
}

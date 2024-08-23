import React from 'react'
import {Stack} from '@mui/material'
import {Button} from '../../atoms'

export const SellerDashboard: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Stack direction={'row'}>
        <Button variant={'contained'}>Create Order</Button>
      </Stack>
    </Stack>
  )
}

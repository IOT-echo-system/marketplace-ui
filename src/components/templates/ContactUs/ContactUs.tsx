import React from 'react'
import {Stack, Typography} from '@mui/material'
import {InProgressFeature} from '../../atoms'

export const ContactUs: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <Typography variant={'h5'} component={'h2'}>
          Contact us
        </Typography>
      </Stack>
      <InProgressFeature/>
    </Stack>
  )
}

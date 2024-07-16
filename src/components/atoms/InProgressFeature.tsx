import {Typography} from '@mui/material'
import {CenteredContainer} from './StyledComponents'
import React from 'react'

export const InProgressFeature: React.FC = () => {
  return (
    <CenteredContainer>
      <Typography color={'error'} textAlign={'center'}>
        We will implement this feature soon!!
      </Typography>
    </CenteredContainer>
  )
}

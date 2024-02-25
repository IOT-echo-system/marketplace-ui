import {Stack, Typography} from '@mui/material'
import React from 'react'
import {styled} from '@mui/material/styles'

const FooterContainer = styled(Stack)(({theme}) => ({
  background: theme.palette.background.default,
  padding: theme.spacing(2)
}))

export const Footer: React.FC = () => {
  return (
    <FooterContainer spacing={2}>
      <Typography variant={'body1'}>Footer</Typography>
    </FooterContainer>
  )
}

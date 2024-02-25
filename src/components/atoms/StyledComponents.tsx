import type {BoxProps} from '@mui/material'
import {Box, Button as MUIButton, Stack, styled} from '@mui/material'
import NextLink from 'next/link'

export const Button = styled(MUIButton)({textTransform: 'none'})

export const FormContainer = styled('form')(({theme}) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(1),
  boxShadow: theme.shadows[1],
  borderRadius: theme.spacing(1),
  margin: theme.spacing(1),
  justifyContent: 'center',
  width: `calc(100vw - ${theme.spacing(4)})`,
  '&>*': {
    margin: theme.spacing(1.5)
  },
  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(60),
    padding: theme.spacing(4)
  }
}))

export const BoxContainer = styled(Box)<BoxProps>(({theme}) => ({
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: theme.spacing(1),
  margin: theme.spacing(1),
  justifyContent: 'center',
  width: `calc(100vw - ${theme.spacing(4)})`,
  '&>*': {
    margin: theme.spacing(2)
  },
  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(72),
    '&>*': {
      margin: theme.spacing(2.5)
    }
  },
  '&>hr': {
    margin: 0
  }
}))

export const CenteredContainer = styled(Stack)(() => ({
  margin: 'auto'
}))

export const TopCenteredContainer = styled(Stack)(({theme}) => ({
  margin: theme.spacing(4, 'auto')
}))

export const Link = styled(NextLink)(() => ({
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
}))

export const BoxWidth = styled(Stack)(() => ({
  width: '90%',
  margin: '0 auto'
}))

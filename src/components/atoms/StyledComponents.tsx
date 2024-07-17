import type {LoadingButtonProps} from '@mui/lab'
import {LoadingButton as MuiLoadingButton} from '@mui/lab'
import type {ButtonBaseProps, ButtonProps, StackProps} from '@mui/material'
import {Button as MuiButton, ButtonBase, Stack, styled} from '@mui/material'
import type {LinkProps} from 'next/link'
import LinkComponent from 'next/link'

export const BoxedContainer = styled(Stack)(({theme}) => ({
  margin: 'auto',
  width: '80%',
  [theme.breakpoints.down('lg')]: {
    width: '90%'
  },
  [theme.breakpoints.down('md')]: {
    width: '95%'
  }
}))

export const WiderBoxedContainer = styled(Stack)(({theme}) => ({
  margin: 'auto',
  width: '90%',
  [theme.breakpoints.down('lg')]: {
    width: '95%'
  },
  [theme.breakpoints.down('md')]: {
    width: '98%'
  }
}))

export const Link = styled(LinkComponent)<LinkProps & {underline?: 'true' | 'false'}>(({theme, underline}) => ({
  textDecoration: underline === 'true' ? 'underline' : 'none',
  color: theme.palette.primary.dark,
  ['&:hover']: {
    textDecoration: 'underline'
  }
}))

export const MenuItemLink = styled(LinkComponent)<LinkProps>(() => ({
  color: 'inherit',
  ['&:hover']: {
    textDecoration: 'none'
  }
}))

export const LoadingButton = styled(MuiLoadingButton)<LoadingButtonProps & ButtonProps>(() => ({
  textTransform: 'initial'
}))

export const Button = styled(MuiButton)<ButtonProps>(() => ({
  textTransform: 'initial'
}))

export const LinkAsText = styled(Link)<ButtonProps>(() => ({
  color: 'inherit',
  ['&:hover']: {
    textDecoration: 'none'
  }
}))

export const ButtonAsLink = styled(ButtonBase)<ButtonBaseProps>(({theme}) => ({
  textTransform: 'initial',
  color: theme.palette.primary.dark,
  ['&:hover']: {
    textDecoration: 'underline'
  }
}))

export const CenteredContainer = styled(Stack)<StackProps>(({theme}) => ({
  margin: 'auto',
  justifyContent: 'center',
  width: theme.spacing(72),
  [theme.breakpoints.down('sm')]: {
    width: '100vw'
  }
}))

export const FormContainer = styled(Stack)<StackProps>(({theme}) => ({
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: theme.spacing(1),
  margin: theme.spacing(1, 'auto'),
  width: '100%',
  padding: theme.spacing(2),
  justifyContent: 'center',
  '&>*': {
    margin: theme.spacing(0.5)
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1)
  }
}))

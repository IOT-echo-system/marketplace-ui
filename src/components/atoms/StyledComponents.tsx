import type {LoadingButtonProps} from '@mui/lab'
import {LoadingButton as MuiLoadingButton} from '@mui/lab'
import type {
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummaryProps,
  ButtonBaseProps,
  ButtonProps,
  StackProps
} from '@mui/material'
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Button as MuiButton,
  ButtonBase,
  Stack,
  styled,
  TextField,
  type TextFieldProps
} from '@mui/material'
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
    width: '100%'
  }
}))

export const Accordion = styled(MuiAccordion)<AccordionProps>(({theme}) => ({
  margin: 0,
  '&.Mui-expanded': {
    margin: 0
  },
  '&.Mui-disabled': {
    background: theme.palette.grey[100]
  }
}))

export const AccordionDetails = styled(MuiAccordionDetails)<AccordionDetailsProps>(({theme}) => ({
  padding: theme.spacing(0)
}))

export const AccordionSummary = styled(MuiAccordionSummary)<AccordionSummaryProps>(({theme}) => ({
  padding: theme.spacing(1, 2)
}))

export const SmallTextField = styled(TextField)<TextFieldProps>(({theme}) => ({
  width: theme.spacing(8),
  padding: 0,
  '& *': {
    padding: 0,
    textAlign: 'center'
  }
}))

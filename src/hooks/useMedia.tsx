import {useMediaQuery} from '@mui/material'
import theme from '../theme/light'

export const useMedia = (): {[P in 'sm' | 'md' | 'lg' | 'xl']: boolean} => {
  return {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
    lg: useMediaQuery(theme.breakpoints.up('lg')),
    xl: useMediaQuery(theme.breakpoints.up('xl'))
  }
}

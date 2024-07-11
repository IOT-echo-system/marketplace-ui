import {useMediaQuery} from '@mui/material'
import theme from '../theme/theme'

type UseMediaReturnType = {[P in 'sm' | 'md' | 'lg' | 'xl']: boolean}

export const useMedia = (): UseMediaReturnType => {
  return {
    sm: useMediaQuery(theme.breakpoints.down('sm')),
    md: useMediaQuery(theme.breakpoints.down('md')),
    lg: useMediaQuery(theme.breakpoints.down('lg')),
    xl: useMediaQuery(theme.breakpoints.down('xl'))
  }
}

import {useMediaQuery} from '@mui/material'
import theme from '../theme/theme'

type UseMediaReturnType = {[P in 'sm' | 'md' | 'lg' | 'xl' | 'laptop' | 'tablet']: boolean} & {
  custom: (maxWidth: number) => boolean
}

export const ScreenWidth = {LAPTOP: 1024, TABLET: 680} as const

export const useMedia = (): UseMediaReturnType => {
  const custom = (maxWidth: number) => useMediaQuery(`@media (max-width:${maxWidth - 0.05}px)`)
  return {
    sm: useMediaQuery(theme.breakpoints.down('sm')),
    md: useMediaQuery(theme.breakpoints.down('md')),
    lg: useMediaQuery(theme.breakpoints.down('lg')),
    xl: useMediaQuery(theme.breakpoints.down('xl')),
    laptop: custom(ScreenWidth.LAPTOP),
    tablet: custom(ScreenWidth.TABLET),
    custom
  }
}

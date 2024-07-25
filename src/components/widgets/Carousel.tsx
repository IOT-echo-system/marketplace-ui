import React from 'react'
import {HeroBanner} from './HeroBanner'
import MuiCarousel from 'react-material-ui-carousel'
import theme from '../../theme/theme'
import type {WidgetType} from './index'

const getIconContainerStyles = (icons: number): React.CSSProperties => ({
  zIndex: 1,
  position: 'absolute',
  width: 'auto',
  marginLeft: `calc(50% - ${icons * 14}px)`,
  padding: '0 8px',
  marginTop: '-48px',
  background: theme.palette.grey[300],
  borderRadius: '16px'
})
const iconStyles: React.CSSProperties = {
  background: theme.palette.secondary.main,
  color: theme.palette.secondary.main,
  height: '16px',
  width: '16px',
  margin: '8px 4px'
}
const activeIconStyles: React.CSSProperties = {
  background: theme.palette.primary.main,
  color: theme.palette.primary.main,
  height: '16px',
  width: '16px',
  margin: '8px 4px'
}

type CarouselPropsType = {data: Array<WidgetType<'hero-banner.hero-banner'>>}
export const Carousel: React.FC<CarouselPropsType> = ({data}) => {
  return (
    <MuiCarousel
      autoPlay
      animation={'slide'}
      duration={400}
      interval={5000}
      stopAutoPlayOnHover
      navButtonsAlwaysInvisible
      indicatorContainerProps={{style: getIconContainerStyles(data.length)}}
      indicatorIconButtonProps={{style: iconStyles}}
      activeIndicatorIconButtonProps={{style: activeIconStyles}}
    >
      {data.map((carousel, index) => (
        <HeroBanner data={carousel} key={`hero-${index}`} />
      ))}
    </MuiCarousel>
  )
}

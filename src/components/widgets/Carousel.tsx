import React from 'react'
import type {HeroBannerPropsType} from './HeroBanner'
import {HeroBanner} from './HeroBanner'
import MuiCarousel from 'react-material-ui-carousel'

import type {WidgetPropType} from '../../services/typing/pageDetails'
import theme from '../../theme/theme'

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

export const Carousel: React.FC<WidgetPropType<Array<{data: HeroBannerPropsType}>>> = ({data}) => {
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
        <HeroBanner data={carousel.data} key={`hero-${index}`} />
      ))}
    </MuiCarousel>
  )
}

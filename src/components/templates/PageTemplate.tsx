import React from 'react'
import {Stack} from '@mui/material'
import type {PageDetails} from '../../services/typing/pageDetails'
import {Carousel} from '../widgets/Carousel'
import * as widgets from '../widgets'
import {HeroBanner} from '../widgets'

type PageTemplatePropsType = {pageDetails: PageDetails}
export const PageTemplate: React.FC<PageTemplatePropsType> = ({pageDetails}) => {
  const isCarouselPresent = pageDetails.carousel.isNotEmpty()
  return (
    <Stack>
      {isCarouselPresent && <Carousel data={pageDetails.carousel} />}
      {!isCarouselPresent &&
        pageDetails.header.map((content, index) => {
          // const Component = widgets[content.widget as keyof typeof widgets]
          return <HeroBanner key={`content_${index}`} data={content.data} />
        })}
      {pageDetails.content.map((content, index) => {
        const Component = widgets[content.widget as keyof typeof widgets]
        return <Component key={`content_${index}`} data={content.data} />
      })}
      {pageDetails.ctaBanner.map((content, index) => {
        const Component = widgets[content.widget as keyof typeof widgets]
        return <Component key={`content_${index}`} data={content.data} />
      })}
    </Stack>
  )
}

import React from 'react'
import {Stack} from '@mui/material'
import type {PageDetails} from '../../services/typing/pageDetails'
import {Carousel} from '../widgets/Carousel'

type PageTemplatePropsType = {pageDetails: PageDetails}
export const PageTemplate: React.FC<PageTemplatePropsType> = ({pageDetails}) => {
  const isCarouselPresent = pageDetails.carousel.isNotEmpty()
  return (
    <Stack>
      {isCarouselPresent && <Carousel data={pageDetails.carousel} />}
      {/*{pageDetails.mainContent.map((content, index) => {*/}
      {/*  const Component = widgets[content.widget as keyof typeof widgets]*/}
      {/*  return <Component key={`content_${index}`} data={content.data} />*/}
      {/*})}*/}
      {/*{pageDetails.ctaBanner.map((content, index) => {*/}
      {/*  const Component = widgets[content.widget as keyof typeof widgets]*/}
      {/*  return <Component key={`content_${index}`} data={content.data} />*/}
      {/*})}*/}
    </Stack>
  )
}

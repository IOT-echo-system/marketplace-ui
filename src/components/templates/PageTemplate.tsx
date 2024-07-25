import React from 'react'
import {Stack} from '@mui/material'
import type {PageDetailsType} from '../widgets'
import {Widget} from '../widgets'
import {Carousel} from '../widgets/Carousel'

type PageTemplatePropsType = {pageDetails: PageDetailsType}
export const PageTemplate: React.FC<PageTemplatePropsType> = ({pageDetails}) => {
  const isCarousel = pageDetails.carousel.isNotEmpty()
  return (
    <Stack>
      {isCarousel && <Carousel data={pageDetails.carousel} />}
      {!isCarousel &&
        pageDetails.header.map(({__component, ...data}, index) => {
          return <Widget key={`header-${index}`} componentKey={__component} data={data} />
        })}
      {pageDetails.content.map(({__component, ...data}, index) => {
        return <Widget key={`header-${index}`} componentKey={__component} data={data} />
      })}
      {pageDetails.ctaBanner.map(({__component, ...data}, index) => {
        return <Widget key={`header-${index}`} componentKey={__component} data={data} />
      })}
    </Stack>
  )
}

import React from 'react'
import {Stack} from '@mui/material'
import type {PageDetails} from '../../services/typing/CMSService'
import * as widgets from '../widgets'

type PageTemplatePropsType = {pageDetails: PageDetails}
export const PageTemplate: React.FC<PageTemplatePropsType> = ({pageDetails}) => {
  return (
    <Stack>
      {pageDetails.header.map((content, index) => {
        const Component = widgets[content.widget as keyof typeof widgets]
        return <Component key={`content_${index}`} data={content.data} />
      })}
      {pageDetails.mainContent.map((content, index) => {
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

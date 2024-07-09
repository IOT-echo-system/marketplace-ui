import React from 'react'
import type {WidgetPropType, WidgetStyles} from './widget'
import type {RTEPropsType} from '../molecules'
import {RTE} from '../molecules'
import {Stack, styled} from '@mui/material'

export const TextContentContainer = styled(Stack)<{styles?: WidgetStyles}>(({theme, styles}) => ({
  margin: '0 auto',
  width: '100%',
  padding: theme.spacing(0, 1),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 2)
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 4)
  },
  [theme.breakpoints.up('lg')]: {
    padding: styles?.width === 'Center' ? theme.spacing(0) : theme.spacing(0, 8),
    width: styles?.width === 'Center' ? theme.spacing(120) : '100%'
  },
  [theme.breakpoints.up('xl')]: {
    padding: styles?.width === 'Center' ? theme.spacing(0) : theme.spacing(0, 16)
  }
}))

export const TextContent: React.FC<WidgetPropType<RTEPropsType & WidgetStyles>> = ({data}) => {
  return (
    <TextContentContainer styles={{width: data.width}}>
      <RTE rte={data.rte} />
    </TextContentContainer>
  )
}

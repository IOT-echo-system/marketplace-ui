import React from 'react'
import type {RTEPropsType} from '../molecules'
import {RTE} from '../molecules'
import type {StackProps} from '@mui/material'
import {Stack, styled} from '@mui/material'
import type {WidgetPropType} from '../../services/typing/pageDetails'

const TextContentContainer = styled(Stack)<StackProps>(({theme}) => ({
  margin: '0 auto',
  width: '100%',
  padding: theme.spacing(0, 1),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 2)
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 4)
  }
}))

export const TextContent: React.FC<WidgetPropType<RTEPropsType>> = ({data}) => {
  return (
    <TextContentContainer>
      <RTE rte={data.rte} />
    </TextContentContainer>
  )
}

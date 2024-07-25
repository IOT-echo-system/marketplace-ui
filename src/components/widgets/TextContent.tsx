import React from 'react'
import type {RTEPropsType} from '../molecules'
import {RTE} from '../molecules'
import {BoxedContainer} from '../atoms'
import {Stack} from '@mui/material'
import type {WidgetPropType} from './index'

export const TextContent: React.FC<WidgetPropType<RTEPropsType>> = ({data}) => {
  return (
    <Stack bgcolor={'background.paper'}>
      <BoxedContainer pt={4} pb={4}>
        <RTE text={data.text} />
      </BoxedContainer>
    </Stack>
  )
}

import React from 'react'
import {CircularProgress, Stack} from '@mui/material'
import {LoadingText} from './LoadingText'

type LoaderPropsType = {text?: string; height?: number}

export const Loader: React.FC<LoaderPropsType> = ({text, height}) => {
  return (
    <Stack justifyContent={'center'} width={'100%'} alignItems={'center'} height={height}>
      <CircularProgress />
      <LoadingText text={text} />
    </Stack>
  )
}

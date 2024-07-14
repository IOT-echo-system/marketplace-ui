import React from 'react'
import {CircularProgress, Stack, Typography} from '@mui/material'

type LoaderPropsType = {text?: string; height?: number}

export const Loader: React.FC<LoaderPropsType> = ({text, height}) => {
  return (
    <Stack justifyContent={'center'} width={'100%'} alignItems={'center'} height={height}>
      <CircularProgress />
      <Typography>{text}</Typography>
    </Stack>
  )
}

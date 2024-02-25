import React from 'react'
import {CircularProgress, Stack, Typography} from '@mui/material'

type LoaderPropsType = {page?: boolean; loadingText?: string}
export const Loader: React.FC<LoaderPropsType> = ({page = false, loadingText}) => {
  return (
    <Stack
      flexDirection={'row'}
      justifyContent={'center'}
      alignItems={'center'}
      style={{height: page ? '100vh' : 'auto'}}
    >
      <Stack alignItems={'center'} spacing={2}>
        <CircularProgress />
        {loadingText && <Typography>{loadingText}</Typography>}
      </Stack>
    </Stack>
  )
}

import React from 'react'
import {CircularProgress} from '@mui/material'

type LoaderPropsType = {text?: string}

export const Loader: React.FC<LoaderPropsType> = () => {
  return <CircularProgress />
}

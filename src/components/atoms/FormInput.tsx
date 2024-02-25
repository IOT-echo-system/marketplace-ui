import React from 'react'
import type {TextFieldProps} from '@mui/material'
import {TextField} from '@mui/material'

export type FormInputType = TextFieldProps

export const FormInput: React.FC<FormInputType> = props => {
  return <TextField variant={props.variant ?? 'outlined'} {...props} />
}

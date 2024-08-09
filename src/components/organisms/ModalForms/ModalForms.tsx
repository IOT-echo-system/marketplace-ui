import type {PropsWithChildren} from 'react'
import React, {useState} from 'react'
import {ModalForm} from '../../atoms'
import {Stack} from '@mui/material'
import type {GetFormPropsTypeFunction} from './model'

export type ModalFormsPropsType<T extends Record<string, unknown>> = {
  getFormDetails: GetFormPropsTypeFunction<T>
  disabled?: boolean
} & T

export const ModalForms = <T extends Record<string, unknown>>(
  props: PropsWithChildren<ModalFormsPropsType<T>>
): React.JSX.Element => {
  const {children, getFormDetails, disabled} = props

  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const formProps = getFormDetails(handleClose, props)

  return (
    <Stack>
      <Stack
        onClick={() => {
          setOpen(!disabled && true)
        }}
      >
        {children}
      </Stack>
      <ModalForm open={open} handleClose={handleClose} {...formProps} />
    </Stack>
  )
}

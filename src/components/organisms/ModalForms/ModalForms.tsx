import type {PropsWithChildren} from 'react'
import React, {useState} from 'react'
import {ModalForm} from '../../atoms'
import {Stack} from '@mui/material'
import type {GetFormPropsTypeFunction} from './model'

export type ModalFormsPropsType<T extends Record<string, unknown>> = {getFormDetails: GetFormPropsTypeFunction<T>} & T

export const ModalForms = <T extends Record<string, unknown>>(
  props: PropsWithChildren<ModalFormsPropsType<T>>
): React.JSX.Element => {
  const {children, getFormDetails} = props

  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const {loading, formInputs, handleSubmit, formTitle, submitLabel} = getFormDetails(handleClose, props)

  return (
    <Stack>
      <Stack
        onClick={() => {
          setOpen(true)
        }}
      >
        {children}
      </Stack>
      <ModalForm
        open={open}
        handleClose={handleClose}
        formInputs={formInputs}
        formTitle={formTitle}
        loading={loading}
        handleSubmit={handleSubmit}
        submitLabel={submitLabel}
      />
    </Stack>
  )
}

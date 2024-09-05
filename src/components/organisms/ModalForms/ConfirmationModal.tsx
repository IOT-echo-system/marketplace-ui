import type {PropsWithChildren} from 'react'
import React, {useState} from 'react'
import {Stack} from '@mui/material'
import type {ConfirmationModalPropsType as ConfirmationModalUnitPropsType} from '../../atoms'
import {ConfirmationModal as ConfirmationModalUnit} from '../../atoms'

export type GetConfirmationModalPropsTypeFunction<T extends Record<string, unknown> = Record<string, unknown>> = (
  handleClose: () => void,
  props: T
) => ConfirmationModalUnitPropsType

type ConfirmationModalPropsType<T extends Record<string, unknown>> = {
  getConfirmationModalDetails: GetConfirmationModalPropsTypeFunction<T>
} & T

export const ConfirmationModal = <T extends Record<string, unknown>>(
  props: PropsWithChildren<ConfirmationModalPropsType<T>>
): React.JSX.Element => {
  const {children, getConfirmationModalDetails} = props
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  const {title, description, loading, cancelText, confirmText, onCancel, onConfirm, cancelColor, confirmColor} =
    getConfirmationModalDetails(handleClose, props)

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <Stack>
      <Stack onClick={handleOpen}>{children}</Stack>
      <ConfirmationModalUnit
        open={open}
        handleClose={handleClose}
        title={title}
        description={description}
        loading={loading}
        cancelText={cancelText}
        confirmText={confirmText}
        cancelColor={cancelColor}
        confirmColor={confirmColor}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </Stack>
  )
}

import React from 'react'
import {Stack, Typography} from '@mui/material'
import {Button, LoadingButton} from './StyledComponents'
import {Modal} from './Modal'
import type {ButtonOwnProps} from '@mui/material/Button/Button'

export type ConfirmationModalPropsType = {
  title: string
  description?: string
  loading?: boolean
  cancelText?: string
  confirmText?: string
  onCancel?: () => void
  onConfirm: () => void
  cancelColor?: ButtonOwnProps['color']
  confirmColor?: ButtonOwnProps['color']
}

type PropsType = ConfirmationModalPropsType & {open: boolean; handleClose: () => void}

export const ConfirmationModal: React.FC<PropsType> = ({
  open,
  handleClose,
  title,
  description,
  loading,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  cancelColor,
  confirmColor
}): React.JSX.Element => {
  return (
    <Modal open={open} handleClose={handleClose}>
      <Stack spacing={2}>
        <Stack>
          <Typography variant={'h5'} component={'div'}>
            {title}
          </Typography>
          <Typography component={'div'}>{description}</Typography>
        </Stack>
        <Stack direction={'row'} spacing={2}>
          {onCancel && (
            <Button variant={'outlined'} color={cancelColor ?? 'error'} onClick={onCancel}>
              {cancelText ?? 'Cancel'}
            </Button>
          )}
          <LoadingButton loading={loading ?? false} variant={'contained'} color={confirmColor} onClick={onConfirm}>
            {confirmText ?? 'Confirm'}
          </LoadingButton>
        </Stack>
      </Stack>
    </Modal>
  )
}

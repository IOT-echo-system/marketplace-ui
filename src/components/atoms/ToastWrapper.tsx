import type {PropsWithChildren} from 'react'
import React, {createRef} from 'react'
import type {SnackbarKey} from 'notistack'
import {SnackbarProvider} from 'notistack'
import {IconButton} from '@mui/material'
import {Close} from '@mui/icons-material'
import {styled} from '@mui/material/styles'

const Toast = styled(SnackbarProvider)(({theme}) => ({
  width: theme.spacing(48)
}))

export const ToastWrapper: React.FC<PropsWithChildren> = ({children}) => {
  const toastRef = createRef<SnackbarProvider>()
  const onClickDismiss = (key: SnackbarKey) => () => {
    toastRef.current?.closeSnackbar(key)
  }

  return (
    <Toast
      maxSnack={5}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      autoHideDuration={5000}
      ref={toastRef}
      aria-multiline={true}
      action={key => (
        <IconButton onClick={onClickDismiss(key)}>
          <Close />
        </IconButton>
      )}
    >
      {children}
    </Toast>
  )
}

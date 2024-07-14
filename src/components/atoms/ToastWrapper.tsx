import type {PropsWithChildren} from 'react'
import React, {createRef} from 'react'
import type {SnackbarKey} from 'notistack'
import {SnackbarProvider} from 'notistack'
import {IconButton} from '@mui/material'
import {Cancel} from '@mui/icons-material'
import {styled} from '@mui/material/styles'

// @ts-expect-error using !important property here to override the default one
const Toast = styled(SnackbarProvider)(({theme}) => ({
  width: theme.spacing(48),
  maxWidth: '85vw',
  float: 'right',
  flexWrap: 'nowrap !important',
  alignItems: 'start !important',
  '& > * > svg': {
    display: 'none !important'
  }
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
      autoHideDuration={30000}
      ref={toastRef}
      aria-multiline={true}
      action={key => (
        <IconButton onClick={onClickDismiss(key)} color={'inherit'}>
          <Cancel />
        </IconButton>
      )}
    >
      {children}
    </Toast>
  )
}

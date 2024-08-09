import {useSnackbar} from 'notistack'
import type {ServerError} from '../services/typing/userService'

export type Toast = {[P in 'success' | 'warning' | 'info']: (message: string) => void} & {
  error: (error: ServerError | Error | string) => void
}
export const useToast = (): Toast => {
  const {enqueueSnackbar} = useSnackbar()
  const warning = (message: string) => {
    enqueueSnackbar(message, {variant: 'warning'})
  }

  const info = (message: string) => {
    enqueueSnackbar(message, {variant: 'info'})
  }

  const error = (errorMessage: ServerError | Error | string) => {
    const errorText =
      ((errorMessage as ServerError).error?.message ?? (errorMessage as Error).message) || (errorMessage as string)
    enqueueSnackbar(errorText, {variant: 'error'})
  }

  const success = (message: string) => {
    enqueueSnackbar(message, {variant: 'success'})
  }
  return {warning, info, error, success}
}

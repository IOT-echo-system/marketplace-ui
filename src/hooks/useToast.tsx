import {useSnackbar} from 'notistack'

export type Toast = {[P in 'success' | 'warning' | 'info']: (message: string) => void} & {
  error: (message: string) => void
}
export const useToast = (): Toast => {
  const {enqueueSnackbar} = useSnackbar()
  const warning = (message: string) => {
    enqueueSnackbar(message, {variant: 'warning'})
  }

  const info = (message: string) => {
    enqueueSnackbar(message, {variant: 'info'})
  }

  const error = (message: string) => {
    enqueueSnackbar(message, {variant: 'error'})
  }

  const success = (message: string) => {
    enqueueSnackbar(message, {variant: 'success'})
  }
  return {warning, info, error, success}
}

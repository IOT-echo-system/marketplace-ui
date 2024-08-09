import type {ChangeEvent, FormEvent} from 'react'
import {useState} from 'react'
import type {FormInputType} from '../../atoms'
import {usePassword, useToast} from '../../../hooks'
import type {AuthFormType} from './AuthForms'
import {UserService} from '../../../services'
import {useRouter} from 'next/router'

const useResetPassword: AuthFormType = () => {
  const {value, onClear, onChange, helperText} = usePassword('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const toast = useToast()
  const router = useRouter()
  const token = router.query.token as string

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    UserService.resetPassword(value, token)
      .then(() => {
        toast.success('Your password updated successfully!!')
        onClear()
        setConfirmPassword('')
      })
      .catch(toast.error)
  }

  const errorOnConfirmPassword = confirmPassword.length !== 0 && value !== confirmPassword

  const inputFields: FormInputType[] = [
    {
      inputType: 'textField',
      type: 'password',
      value: value,
      onChange,
      label: 'Password',
      required: true,
      error: Boolean(helperText),
      helperText: helperText,
      size: 'small'
    },
    {
      inputType: 'textField',
      type: 'password',
      value: confirmPassword,
      onChange: (event: ChangeEvent<HTMLInputElement>): void => {
        setConfirmPassword(event.target.value)
      },
      label: 'Confirm password',
      required: true,
      error: errorOnConfirmPassword,
      helperText: errorOnConfirmPassword ? 'password and confirm password should match.' : '',
      size: 'small'
    }
  ]

  return {
    handleSubmit,
    inputFields,
    title: 'Reset password',
    submitBtnText: 'Reset password'
  }
}

export {useResetPassword}

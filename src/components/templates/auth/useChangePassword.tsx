import type {ChangeEvent} from 'react'
import {useEffect, useState} from 'react'
import type {FormInputType} from '../../atoms'
import {useForm, usePassword, useToast} from '../../../hooks'
import type {AuthFormType} from './AuthForms'
import {UserService} from '../../../services'

const useChangePassword: AuthFormType = () => {
  const [confirmPassword, setConfirmPassword] = useState('')
  const {values, onClear, onChange, handleSubmit} = useForm({currentPassword: '', password: ''})
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const password = usePassword(values.password)

  const handleChange = <K extends keyof typeof values>(keyName: K) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(keyName, event.target.value)
    }
  }

  useEffect(() => {
    onChange('password', password.value)
  }, [password.value])

  const onSubmit = () => {
    setLoading(true)
    UserService.changePassword(values)
      .then(() => {
        toast.success('Your password updated successfully!!')
        onClear()
        setConfirmPassword('')
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  const errorOnConfirmPassword = confirmPassword.length !== 0 && values.password !== confirmPassword

  const inputFields: FormInputType[] = [
    {
      inputType: 'textField',
      type: 'password',
      value: values.currentPassword,
      onChange: handleChange('currentPassword'),
      label: 'Current password',
      required: true,
      size: 'small'
    },
    {
      inputType: 'textField',
      type: 'password',
      value: values.password,
      onChange: password.onChange,
      label: 'New password',
      required: true,
      error: Boolean(password.helperText),
      helperText: password.helperText,
      size: 'small'
    },
    {
      inputType: 'textField',
      type: 'password',
      value: confirmPassword,
      onChange: (event: ChangeEvent<HTMLInputElement>): void => {
        setConfirmPassword(event.target.value)
      },
      label: 'Confirm new password',
      required: true,
      error: errorOnConfirmPassword,
      helperText: errorOnConfirmPassword ? 'password and confirm password should match.' : '',
      size: 'small'
    }
  ]

  return {
    handleSubmit: handleSubmit(onSubmit),
    inputFields,
    title: 'Change password',
    submitBtnText: 'Change password',
    loading
  }
}

export {useChangePassword}

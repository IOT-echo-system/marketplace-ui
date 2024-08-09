import type {FormInputType} from '../../atoms'
import {useForm, useToast} from '../../../hooks'
import type {AuthFormType} from './AuthForms'
import {UserService} from '../../../services'
import {useState} from 'react'

const useForgetPassword: AuthFormType = () => {
  const {values, onClear, onChange, handleSubmit} = useForm({email: ''})
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const onSubmit = () => {
    setLoading(true)
    UserService.forgetPassword(values)
      .then(() => {
        toast.success(`An email has been sent to your email address. 
        Please check your inbox and follow the instructions to reset your password. 
        If you do not receive the email within a few minutes, please check your spam folder or try again.`)
        onClear()
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  const inputFields: FormInputType[] = [
    {
      inputType: 'textField',
      type: 'email',
      value: values.email,
      onChange: event => {
        onChange('email', event.target.value)
      },
      label: 'Email',
      size: 'small',
      required: true
    }
  ]

  return {
    handleSubmit: handleSubmit(onSubmit),
    inputFields,
    title: 'Forget password',
    submitBtnText: 'Submit',
    loading
  }
}

export {useForgetPassword}

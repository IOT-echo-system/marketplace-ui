import type {ChangeEvent} from 'react'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import type {FormInputType} from '../../atoms'
import {useResetPassword} from './useResetPassword'
import {useDispatch, useForm, useToast} from '../../../hooks'
import {UserService} from '../../../services'
import {storage, StorageKeys} from '../../../utils/storage'
import {setUser} from '../../../store/actions'
import type {AuthFormType} from './AuthForms'

export const useSignUp: AuthFormType = ({redirectTo, onSuccess}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {values, onChange, handleSubmit} = useForm({name: '', username: '', email: '', phone: 0})
  const [isValidMobile, setIsValidMobile] = useState(true)
  const {inputFields: passwordInputFields} = useResetPassword({withOldPassword: false})
  const toast = useToast()

  useEffect(() => {
    const isValidMobile = values.phone === 0 || (values.phone >= 1000000000 && values.phone <= 9999999999)
    setIsValidMobile(isValidMobile)
  }, [values.phone])

  const onSubmit = () => {
    const password = passwordInputFields[0]?.value as string
    UserService.signUp({password, ...values})
      .then(response => {
        storage.setItem(StorageKeys.AUTH, {token: response.jwt})
        dispatch(setUser(response.user))
        onSuccess && onSuccess()
        if (redirectTo) {
          return router.push(redirectTo)
        }
      })
      .catch(toast.error)
  }

  const inputFields: FormInputType[] = [
    {
      inputType: 'textField',
      size: 'small',
      value: values.name,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        onChange('name', event.target.value)
      },
      label: 'Name',
      required: true
    },
    {
      inputType: 'textField',
      size: 'small',
      value: values.username,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        onChange('username', event.target.value)
      },
      label: 'Username',
      required: true
    },
    {
      inputType: 'textField',
      size: 'small',
      type: 'email',
      value: values.email,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        onChange('email', event.target.value)
      },
      label: 'Email',
      required: true
    },
    {
      inputType: 'textField',
      type: 'number',
      label: 'Phone',
      value: values.phone === 0 ? '' : values.phone,
      required: true,
      size: 'small',
      onChange: event => {
        onChange('phone', +event.target.value)
      },
      error: !isValidMobile,
      helperText: !isValidMobile ? 'Enter a valid phone no.' : ''
    },
    ...passwordInputFields.map(input => ({...input, size: 'small'}) as FormInputType)
  ]

  return {
    handleSubmit: handleSubmit(onSubmit),
    submitBtnDisabled: inputFields.some(inputField => inputField.error),
    inputFields,
    title: 'Register',
    submitBtnText: 'Sign up'
  }
}

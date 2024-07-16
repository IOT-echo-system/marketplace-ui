import type {ChangeEvent} from 'react'
import {useRouter} from 'next/router'
import type {FormInputType} from '../../atoms'
import {useResetPassword} from './useResetPassword'
import {useDispatch, useForm, useToast} from '../../../hooks'
import {UserService} from '../../../services'
import type {ServerError} from '../../../services/typing/authService'
import {storage, StorageKeys} from '../../../utils/storage'
import {setUser} from '../../../store/actions/user'
import type {AuthFormType} from './AuthForms'

export const useSignUp: AuthFormType = ({redirectTo, onSuccess}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {values, onChange, handleSubmit} = useForm({name: '', username: '', email: ''})
  const {inputFields: passwordInputFields} = useResetPassword(false)
  const toast = useToast()

  const handleChange = <K extends keyof typeof values>(keyName: K) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(keyName, event.target.value)
    }
  }

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
      .catch((error: ServerError) => {
        toast.error(error.error.message)
      })
  }

  const inputFields: FormInputType[] = [
    {
      inputType: 'textField',
      size: 'small',
      value: values.name,
      onChange: handleChange('name'),
      label: 'Name',
      required: true
    },
    {
      inputType: 'textField',
      size: 'small',
      value: values.username,
      onChange: handleChange('username'),
      label: 'Username',
      required: true
    },
    {
      inputType: 'textField',
      size: 'small',
      type: 'email',
      value: values.email,
      onChange: handleChange('email'),
      label: 'Email',
      required: true
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

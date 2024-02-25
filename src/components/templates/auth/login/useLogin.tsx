import {useRouter} from 'next/router'
import type {ChangeEvent} from 'react'
import type React from 'react'
import {useState} from 'react'
import type {FormInputType} from '../../../atoms'
import {useForm} from '../../../../hooks'
import {AuthService} from '../../../../services'
import {Config} from '../../../../config'
import type {ServerError} from '../../../../typing/error'

type UseLoginReturnType = {
  inputFields: FormInputType[]
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  error: string
}
const useLogin = (): UseLoginReturnType => {
  const router = useRouter()
  const [error, setError] = useState('')
  const {values, onChange, handleSubmit} = useForm({email: '', password: ''})
  const authService = AuthService()

  const handleChange = <K extends keyof typeof values>(keyName: K) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(keyName, event.target.value)
    }
  }

  const onSubmit = () => {
    setError('')
    authService
      .login(values)
      .then(() => router.push(Config.HOME_PAGE_PATH))
      .catch((error: ServerError) => {
        setError(error.message)
      })
  }

  const inputFields: FormInputType[] = [
    {type: 'email', value: values.email, onChange: handleChange('email'), label: 'Email', required: true},
    {type: 'password', value: values.password, onChange: handleChange('password'), label: 'Password', required: true}
  ]

  return {
    error,
    handleSubmit: handleSubmit(onSubmit),
    inputFields
  }
}

export {useLogin}

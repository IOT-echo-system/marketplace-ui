import type {ChangeEvent} from 'react'
import {useState} from 'react'
import type {FormInputType} from '../../atoms'
import {useDispatch, useForm, useToast} from '../../../hooks'
import {UserService} from '../../../services'
import {storage, StorageKeys} from '../../../utils/storage'
import {setUser} from '../../../store/actions'
import {useRouter} from 'next/router'
import type {AuthFormType} from './AuthForms'

const useLogin: AuthFormType = ({redirectTo, onSuccess}) => {
  const dispatch = useDispatch()
  const toast = useToast()
  const router = useRouter()
  const {values, onChange, handleSubmit} = useForm({identifier: '', password: ''})
  const [loading, setLoading] = useState(false)

  const handleChange = <K extends keyof typeof values>(keyName: K) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(keyName, event.target.value)
    }
  }

  const onSubmit = () => {
    setLoading(true)
    UserService.login(values)
      .then(({user, jwt}) => {
        storage.setItem(StorageKeys.AUTH, {token: jwt})
        dispatch(setUser(user))
        onSuccess && onSuccess()
        if (redirectTo) {
          return router.push(redirectTo)
        }
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  const inputFields: FormInputType[] = [
    {
      inputType: 'textField',
      size: 'small',
      value: values.identifier,
      onChange: handleChange('identifier'),
      label: 'Username or email',
      required: true
    },
    {
      inputType: 'textField',
      type: 'password',
      size: 'small',
      value: values.password,
      onChange: handleChange('password'),
      label: 'Password',
      required: true
    }
  ]

  return {
    handleSubmit: handleSubmit(onSubmit),
    inputFields,
    title: 'Login',
    submitBtnText: 'Login',
    submitBtnDisabled: false,
    loading
  }
}

export {useLogin}

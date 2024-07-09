import type {FormEvent} from 'react'
import {useState} from 'react'

type UseFormReturnType<T extends Record<string, number | boolean | string>> = {
  onChange: <U extends keyof T>(keyName: U, value: T[U]) => void
  onSubmit: (handleSubmit: (values: T) => void) => (event: FormEvent) => void
  values: T
}

export const useForm = <T extends Record<string, number | boolean | string>>(initialValue: T): UseFormReturnType<T> => {
  const [values, setValues] = useState({...initialValue})
  const onChange = <U extends keyof T>(keyName: U, value: T[U]) => {
    setValues({...values, [keyName]: value})
  }

  const onSubmit = (handleSubmit: (values: T) => void) => (event: FormEvent) => {
    event.preventDefault()
    handleSubmit(values)
  }

  return {values, onChange, onSubmit}
}

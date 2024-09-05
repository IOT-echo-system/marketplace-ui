import type {FormEvent, FormEventHandler} from 'react'
import {useState} from 'react'

type UserFormReturnType<T> = {
  handleSubmit: (onSubmit: (values: T) => void) => FormEventHandler<HTMLFormElement>
  onChange: <K extends keyof T>(name: K, value: T[K]) => void
  values: T
  onClear: () => void
}

export const useForm = <T extends Record<string, unknown>>(initialValues: T): UserFormReturnType<T> => {
  const [values, setValues] = useState<T>({...initialValues})

  const onChange = <K extends keyof T>(name: K, value: T[K]): void => {
    setValues(prevValues => ({...prevValues, [name]: value}))
  }

  const onClear = () => {
    setValues(() => initialValues)
  }

  const handleSubmit = (onSubmit: (values: T) => void) => (event: FormEvent) => {
    event.preventDefault()
    onSubmit(values)
  }

  return {onChange, values, handleSubmit, onClear}
}

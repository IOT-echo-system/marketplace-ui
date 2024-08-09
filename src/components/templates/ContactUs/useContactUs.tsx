import type {FormEvent} from 'react'
import {useEffect, useState} from 'react'
import type {FormInputType} from '../../atoms'
import {useForm, useToast} from '../../../hooks'
import {CMSService} from '../../../services'

type UseContactUsReturnType = {
  submitBtnText: string
  submitBtnDisabled: boolean
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  inputFields: FormInputType[]
  loading: boolean
}

export const useContactUs = (): UseContactUsReturnType => {
  const [loading, setLoading] = useState(false)
  const [isValidPhone, setIsValidPhone] = useState(true)
  const toast = useToast()
  const {values, onClear, handleSubmit, onChange} = useForm({
    name: '',
    email: '',
    phone: 0,
    subject: '',
    message: ''
  })

  useEffect(() => {
    setIsValidPhone(values.phone === 0 || (values.phone >= 1000000000 && values.phone <= 9999999999))
  }, [values.phone])

  const onSubmit = (finalValues: typeof values) => {
    setLoading(true)
    CMSService.contact(finalValues)
      .then(() => {
        onClear()
        toast.success('We got your query, We will reach out to you soon!!')
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  const inputFields: FormInputType[] = [
    {
      inputType: 'textField',
      value: values.name,
      required: true,
      label: 'Full name',
      onChange: event => {
        onChange('name', event.target.value)
      }
    },
    {
      inputType: 'textField',
      value: values.email,
      type: 'email',
      required: true,
      label: 'Email',
      onChange: event => {
        onChange('email', event.target.value)
      }
    },
    {
      inputType: 'textField',
      value: values.phone === 0 ? '' : values.phone,
      type: 'tel',
      required: true,
      label: 'Phone',
      onChange: event => {
        onChange('phone', isNaN(+event.target.value) ? values.phone : +event.target.value)
      },
      error: !isValidPhone,
      helperText: isValidPhone ? '' : 'Enter a valid phone number.'
    },
    {
      inputType: 'textField',
      value: values.subject,
      label: 'Subject',
      onChange: event => {
        onChange('subject', event.target.value)
      }
    },
    {
      inputType: 'textField',
      value: values.message,
      multiline: true,
      rows: 4,
      required: true,
      label: 'How can we help?',
      onChange: event => {
        onChange('message', event.target.value)
      }
    }
  ]
  return {
    inputFields,
    handleSubmit: handleSubmit(onSubmit),
    submitBtnText: 'Send message',
    submitBtnDisabled: !isValidPhone,
    loading
  }
}

import type React from 'react'
import {useState} from 'react'
import type {TextFieldProps} from '@mui/material'
import {useForm} from '../../../hooks'
import {CMSService} from '../../../services'

export type ContactFormValuesType = {
  name: string
  email: string
  subject: string
  phone: string
  message: string
  consent: boolean
}
type UseContactFormType = () => {
  handleSubmit: () => void
  submitted: boolean
  onChange: <U extends keyof ContactFormValuesType>(keyName: U, value: ContactFormValuesType[U]) => void
  onSubmit: (handleSubmit: (values: ContactFormValuesType) => void) => (event: React.FormEvent) => void
  values: ContactFormValuesType
  responseMessage: string
  error: boolean
  fields: TextFieldProps[]
  validationError: boolean
}

export const useContactForm: UseContactFormType = () => {
  const initialValue: ContactFormValuesType = {name: '', email: '', subject: '', phone: '', message: '', consent: false}
  const {values, onChange, onSubmit} = useForm(initialValue)
  const [submitted, setSubmitted] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [error, setError] = useState(false)

  const errorOnPhone = values.phone.length === 0 ? false : values.phone.length !== 10 || isNaN(Number(values.phone))
  const fields: TextFieldProps[] = [
    {
      label: 'Full name',
      required: true,
      value: values.name,
      onChange: event => {
        onChange('name', event.target.value)
      }
    },
    {
      label: 'Email',
      required: true,
      type: 'email',
      value: values.email,
      onChange: event => {
        onChange('email', event.target.value)
      }
    },
    {
      label: 'Phone',
      required: true,
      value: values.phone,
      onChange: event => {
        onChange('phone', event.target.value)
      },
      helperText: errorOnPhone ? 'Enter valid phone number' : '',
      error: errorOnPhone
    },
    {
      label: 'Subject',
      value: values.subject,
      onChange: event => {
        onChange('subject', event.target.value)
      }
    },
    {
      label: 'How can we help?',
      required: true,
      multiline: true,
      rows: 4,
      value: values.message,
      onChange: event => {
        onChange('message', event.target.value)
      }
    }
  ]

  const handleSubmit = () => {
    setError(false)
    setResponseMessage('')
    CMSService.contact(values)
      .then(() => {
        setSubmitted(true)
        setResponseMessage('Thank you contacting us! Our team will reach out to you soon.')
      })
      .catch(() => {
        setError(true)
        setResponseMessage('Something went wrong, please try again!')
      })
  }
  return {
    handleSubmit,
    responseMessage,
    error,
    onSubmit,
    submitted,
    fields,
    values,
    onChange,
    validationError: errorOnPhone || !values.consent
  }
}

import React, {type FormEvent} from 'react'
import type {FormInputType} from '../../atoms'
import {Form} from '../../atoms'

type Document = Record<string, unknown>
type AuthFormPropsType<T extends Document = Document> = {redirectTo?: string; onSuccess?: () => void} & T

export type AuthFormType<T extends Document = Document> = (props: AuthFormPropsType<T>) => {
  inputFields: FormInputType[]
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  submitBtnDisabled?: boolean
  title: string
  submitBtnText: string
  loading?: boolean
}

type AuthFormsPropsType<T extends Document> = {
  getFormDetails: AuthFormType<T>
  title?: string
  submitBtnText?: string
} & AuthFormPropsType<T>

export const AuthForms = <T extends Document>(props: AuthFormsPropsType<T>): React.JSX.Element => {
  const {getFormDetails, submitBtnText: btnText, title: formTitle} = props
  const {handleSubmit, submitBtnDisabled, inputFields, title, submitBtnText, loading} = getFormDetails(props)
  return (
    <Form
      title={formTitle ?? title}
      inputFields={inputFields}
      handleSubmit={handleSubmit}
      submitBtnText={btnText ?? submitBtnText}
      submitBtnDisabled={submitBtnDisabled}
      loading={loading}
    />
  )
}

import React, {type FormEvent} from 'react'
import {Form} from '../../molecules'
import type {FormInputType} from '../../atoms'

type AuthFormPropsType = {redirectTo?: string; onSuccess?: () => void}
export type AuthFormType = (props: AuthFormPropsType) => {
  inputFields: FormInputType[]
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  submitBtnDisabled?: boolean
  title: string
  submitBtnText: string
}

type AuthFormsPropsType = {getFormDetails: AuthFormType; title?: string; submitBtnText?: string} & AuthFormPropsType
export const AuthForms: React.FC<AuthFormsPropsType> = ({
  getFormDetails,
  redirectTo,
  onSuccess,
  submitBtnText: btnText,
  title: formTitle
}) => {
  const {handleSubmit, submitBtnDisabled, inputFields, title, submitBtnText} = getFormDetails({redirectTo, onSuccess})
  return (
    <Form
      title={formTitle ?? title}
      inputFields={inputFields}
      handleSubmit={handleSubmit}
      submitBtnText={btnText ?? submitBtnText}
      submitBtnDisabled={submitBtnDisabled}
    />
  )
}

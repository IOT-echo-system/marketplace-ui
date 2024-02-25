import React from 'react'
import {useResetPassword} from './useResetPassword'
import {Form} from '../../../molecules/Form'

type ResetPasswordPropsType = {withOldPassword: boolean; title: string; redirectTo: string}

export const ResetPassword: React.FC<ResetPasswordPropsType> = ({withOldPassword, title, redirectTo}) => {
  const {handleSubmit, error, inputFields} = useResetPassword(withOldPassword, redirectTo)

  return (
    <Form
      title={title}
      error={error}
      inputFields={inputFields}
      handleSubmit={handleSubmit}
      submitBtnText={'Reset password'}
    />
  )
}

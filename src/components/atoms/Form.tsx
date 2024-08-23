import type {StackProps} from '@mui/material'
import {Stack, Typography} from '@mui/material'
import type {FormEvent} from 'react'
import React from 'react'
import type {FormInputType} from '../atoms'
import {FormInput, LoadingButton} from '../atoms'

export type FormPropsType = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  title?: string
  inputFields: FormInputType[]
  submitBtnText: string
  submitBtnDisabled?: boolean
  loading?: boolean
} & StackProps

export const Form: React.FC<FormPropsType> = props => {
  const {title, handleSubmit, inputFields, submitBtnDisabled, loading, submitBtnText, ...stackProps} = props
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} {...stackProps}>
        {title && <Typography variant={'h5'}>{title}</Typography>}
        {inputFields.map((inputField, index) => (
          <FormInput key={`input-${index}`} {...inputField} />
        ))}
        <LoadingButton
          type={'submit'}
          variant={'contained'}
          size={'large'}
          disabled={submitBtnDisabled ?? false}
          loading={loading}
          fullWidth
        >
          {submitBtnText}
        </LoadingButton>
      </Stack>
    </form>
  )
}

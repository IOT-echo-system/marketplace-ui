import {Stack, Typography} from '@mui/material'
import type {FormEvent} from 'react'
import React from 'react'
import type {FormInputType} from '../atoms'
import {FormInput, LoadingButton} from '../atoms'

export type FormProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  title: string
  inputFields: FormInputType[]
  submitBtnText: string
  submitBtnDisabled?: boolean
  loading?: boolean
}

export const Form: React.FC<FormProps> = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Stack spacing={2}>
        <Typography variant={'h5'}>{props.title}</Typography>
        {props.inputFields.map((inputField, index) => (
          <FormInput key={`input-${index}`} {...inputField} />
        ))}
        <LoadingButton
          type={'submit'}
          variant={'contained'}
          size={'large'}
          disabled={props.submitBtnDisabled}
          loading={props.loading}
        >
          {props.submitBtnText}
        </LoadingButton>
      </Stack>
    </form>
  )
}

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
  return (
    <form onSubmit={props.handleSubmit}>
      <Stack spacing={2} {...props}>
        {props.title && <Typography variant={'h5'}>{props.title}</Typography>}
        {props.inputFields.map((inputField, index) => (
          <FormInput key={`input-${index}`} {...inputField} />
        ))}
        <LoadingButton
          type={'submit'}
          variant={'contained'}
          size={'large'}
          disabled={props.submitBtnDisabled ?? false}
          loading={props.loading}
          fullWidth
        >
          {props.submitBtnText}
        </LoadingButton>
      </Stack>
    </form>
  )
}

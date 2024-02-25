import {Stack, Typography} from '@mui/material'
import type {FormEvent} from 'react'
import React from 'react'
import type {FormInputType} from '../atoms'
import {Button, FormContainer, FormInput} from '../atoms'

export type FormProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  title: string
  error?: string
  inputFields: FormInputType[]
  submitBtnText: string
  submitBtnDisabled?: boolean
}

export const Form: React.FC<FormProps> = props => {
  return (
    <FormContainer onSubmit={props.handleSubmit}>
      <Stack spacing={2}>
        <Typography variant={'h5'}>{props.title}</Typography>
        {props.error && (
          <Typography variant={'body1'} color={'error'}>
            {props.error}
          </Typography>
        )}
        {props.inputFields.map((inputField, index) => (
          <FormInput key={`input-${index}`} {...inputField} />
        ))}
        <Button type={'submit'} variant={'contained'} size={'large'} disabled={props.submitBtnDisabled}>
          {props.submitBtnText}
        </Button>
      </Stack>
    </FormContainer>
  )
}

import React from 'react'
import {Checkbox, Stack, TextField, Typography} from '@mui/material'
import Link from 'next/link'
import theme from '../../../theme/theme'
import {useContactForm} from './useContactForm'
import {Button} from '../../atoms'

export const ContactUs: React.FC = () => {
  const {handleSubmit, responseMessage, error, onSubmit, submitted, fields, values, onChange, validationError} =
    useContactForm()

  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <Typography variant={'h4'} component={'h2'}>
          Contact us
        </Typography>
        {responseMessage && <Typography color={error ? 'error' : 'success'}>{responseMessage}</Typography>}
      </Stack>
      {!submitted && (
        <Stack component={'form'} spacing={2} onSubmit={onSubmit(handleSubmit)}>
          {fields.map((props, index) => {
            return <TextField key={`text-field-${index}`} {...props} />
          })}
          <Stack
            direction={'row'}
            alignItems={'start'}
            spacing={1}
            p={1}
            sx={{background: theme.palette.background.default}}
          >
            <Checkbox
              sx={{padding: 0}}
              value={values.consent}
              onChange={event => {
                onChange('consent', event.target.checked)
              }}
              required
            />
            <Typography variant={'body2'}>
              I agree to share my information with you and understand it will be used as described in{' '}
              <Typography
                component={Link}
                href={'/privacy-policy'}
                sx={{fontSize: 'inherit', textDecoration: 'underline'}}
              >
                Robotutor Tech's privacy policy
              </Typography>
              .
            </Typography>
          </Stack>
          <Stack direction={'row'}>
            <Button type={'submit'} variant={'contained'} disabled={validationError}>
              Submit
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}

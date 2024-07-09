import React from 'react'
import {Checkbox, Stack, Typography} from '@mui/material'
import {BoxedContainer, Button, FormInput, Link} from '../../atoms'
import theme from '../../../theme/theme'
import {useRegistrationForm} from './useRegistrationForm'
import {useMedia} from '../../../hooks'

export const RegistrationForm: React.FC = () => {
  const {handleSubmit, responseMessage, error, onSubmit, submitted, fields, values, onChange} = useRegistrationForm()
  const media = useMedia()

  return (
    <BoxedContainer
      justifyContent={'center'}
      alignItems={{xs: 'center', lg: 'start'}}
      mt={4}
      mb={4}
      spacing={{xs: 4, sm: 8, lg: 12}}
      direction={{xs: 'column', lg: 'row'}}
    >
      <Stack sx={{width: {xs: '100%', sm: '80%', md: '100%', lg: '70%', xl: '50%'}}} spacing={2}>
        <Stack spacing={2}>
          <Typography variant={'h4'} component={'h2'}>
            Registration form
          </Typography>
          {responseMessage && <Typography color={error ? 'error' : 'success'}>{responseMessage}</Typography>}
        </Stack>
        {!submitted && (
          <Stack component={'form'} spacing={2} onSubmit={onSubmit(handleSubmit)}>
            <Stack direction={media.md ? 'row' : 'column'} flexWrap={'wrap'} justifyContent={'space-between'}>
              {fields.map((props, index) => {
                return (
                  <Stack key={`form-input-${index}`} width={media.md ? 'calc(50% - 8px)' : '100%'} mt={2}>
                    <FormInput {...props} />
                  </Stack>
                )
              })}
            </Stack>
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
                I hereby declare that the particulars provided in the form are correct and I duly agree to the&nbsp;
                <Typography
                  component={Link}
                  target={'_blank'}
                  href={'/training-privacy-policy'}
                  sx={{fontSize: 'inherit', textDecoration: 'underline'}}
                >
                  Privacy Policy
                </Typography>
                &nbsp;of the company.
              </Typography>
            </Stack>
            <Stack direction={media.md ? 'row' : 'column-reverse'} spacing={2}>
              <Button size={'large'} variant={'outlined'}>
                Clear
              </Button>
              <Button size={'large'} type={'submit'} variant={'contained'}>
                Proceed to pay
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </BoxedContainer>
  )
}

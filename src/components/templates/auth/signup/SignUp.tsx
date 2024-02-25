import {useSignUp} from './useSignUp'
import React from 'react'
import {CenteredContainer, Link} from '../../../atoms'
import {Stack, Typography} from '@mui/material'
import {Form} from '../../../molecules'
import {useMedia} from '../../../../hooks'
import {Config} from '../../../../config'

export const SignUp: React.FC = () => {
  const title = 'Sign up'
  const media = useMedia()
  const {handleSubmit, error, submitBtnDisabled, inputFields} = useSignUp()

  return (
    <CenteredContainer>
      <Form
        title={title}
        error={error}
        inputFields={inputFields}
        handleSubmit={handleSubmit}
        submitBtnText={'Sign up'}
        submitBtnDisabled={submitBtnDisabled}
      />
      <Stack
        direction={media.md ? 'row' : 'column'}
        justifyContent={'space-between'}
        alignItems={media.md ? 'center' : 'start'}
        spacing={1}
        m={2}
      >
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Typography>Already have an account?</Typography>
          <Link href={Config.LOGIN_PAGE_PATH}>Login</Link>
        </Stack>
        <Link href={Config.FORGOT_PASSWORD_PAGE_PATH}>Forgot password</Link>
      </Stack>
    </CenteredContainer>
  )
}

import {useLogin} from './useLogin'
import React from 'react'
import {CenteredContainer, Link} from '../../../atoms'
import {Stack, Typography} from '@mui/material'
import {useMedia} from '../../../../hooks'
import {Form} from '../../../molecules'
import {Config} from '../../../../config'

export const LogIn: React.FC = () => {
  const {handleSubmit, error, inputFields} = useLogin()
  const media = useMedia()
  const title = 'Login'
  return (
    <CenteredContainer>
      <Form title={title} error={error} inputFields={inputFields} handleSubmit={handleSubmit} submitBtnText={'Login'} />
      <Stack
        direction={media.md ? 'row' : 'column'}
        justifyContent={'space-between'}
        alignItems={media.md ? 'center' : 'start'}
        spacing={1}
        m={2}
      >
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Typography>Don't have an account?</Typography>
          <Link href={Config.SIGN_UP_PAGE_PATH}>Signup</Link>
        </Stack>
        <Link href={Config.FORGOT_PASSWORD_PAGE_PATH}>Forgot password</Link>
      </Stack>
    </CenteredContainer>
  )
}

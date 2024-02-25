import type {NextPage} from 'next'
import React, {useState} from 'react'
import {Config} from '../../config'
import {useMedia} from '../../hooks'
import {Stack, Typography} from '@mui/material'
import {CenteredContainer, Link} from '../../components/atoms'
import {ResetPassword, VerifyOtp} from '../../components/templates/auth'

const ForgotPasswordPage: NextPage = () => {
  const [otpVerified, setOtpVerified] = useState(false)
  const media = useMedia()

  return (
    <CenteredContainer>
      {otpVerified ? (
        <ResetPassword title={'Change password'} withOldPassword={false} redirectTo={Config.LOGIN_PAGE_PATH} />
      ) : (
        <VerifyOtp title={'Forgot password'} setOtpVerified={setOtpVerified} />
      )}
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
      </Stack>
    </CenteredContainer>
  )
}

export default ForgotPasswordPage

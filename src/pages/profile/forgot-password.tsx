import type {GetServerSideProps, NextPage} from 'next'
import React, {useState} from 'react'
import {Config} from '../../config'
import {useMedia} from '../../hooks'
import {Stack, Typography} from '@mui/material'
import {BoxedContainer, CenteredContainer, Link} from '../../components/atoms'
import {CMSService} from '../../services'
import {ResetPassword, VerifyOtp} from '../../components/templates/auth'

const ForgotPasswordPage: NextPage = () => {
  const [otpVerified, setOtpVerified] = useState(false)
  const media = useMedia()

  return (
    <BoxedContainer minHeight={'50vh'} p={2}>
      <CenteredContainer>
        {otpVerified ? (
          <ResetPassword title={'Change password'} withOldPassword={false} redirectTo={Config.LOGIN_PAGE_PATH} />
        ) : (
          <VerifyOtp title={'Reset password'} setOtpVerified={setOtpVerified} />
        )}
        <Stack
          direction={media.sm ? 'column' : 'row'}
          justifyContent={'space-between'}
          alignItems={'start'}
          spacing={1}
        >
          <Stack direction={'row'} spacing={1} alignItems={'start'}>
            <Typography>Don't have an account?</Typography>
            <Link href={Config.SIGN_UP_PAGE_PATH}>Signup</Link>
          </Stack>
          <Stack direction={'row'} spacing={1} alignItems={'start'}>
            <Link href={Config.LOGIN_PAGE_PATH}>Login</Link>
          </Stack>
        </Stack>
      </CenteredContainer>
    </BoxedContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialValue = await CMSService.getInitialValue()
    return {props: {initialValue}}
  } catch (error) {
    return {props: {}}
  }
}

export default ForgotPasswordPage

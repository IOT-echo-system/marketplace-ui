import type {GetServerSideProps, NextPage} from 'next'
import React from 'react'
import {CMSService} from '../../services'
import {Config} from '../../config'
import {CenteredContainer, Link} from '../../components/atoms'
import {Stack, Typography} from '@mui/material'
import {AuthForms, useSignUp} from '../../components/templates/auth'
import {useMedia} from '../../hooks'
import {ProfileWrapper} from '../../components/templates/profile/ProfileWrapper'

const SignUpPage: NextPage = () => {
  const media = useMedia()
  return (
    <ProfileWrapper requiredLoggedIn={false}>
      <CenteredContainer p={2} spacing={2}>
        <AuthForms getFormDetails={useSignUp} redirectTo={Config.HOME_PAGE_PATH} />
        <Stack
          direction={media.sm ? 'column' : 'row'}
          justifyContent={'space-between'}
          alignItems={'start'}
          spacing={1}
        >
          <Stack direction={'row'} spacing={1} alignItems={'start'}>
            <Typography>Already have an account?</Typography>
            <Link href={Config.LOGIN_PAGE_PATH}>Login</Link>
          </Stack>
          <Link href={Config.FORGOT_PASSWORD_PAGE_PATH}>Forgot password</Link>
        </Stack>
      </CenteredContainer>
    </ProfileWrapper>
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

export default SignUpPage

import type {GetServerSideProps, NextPage} from 'next'
import React, {useEffect} from 'react'
import {CMSService} from '../../services'
import {Config} from '../../config'
import {useMedia, useSelector} from '../../hooks'
import {useRouter} from 'next/router'
import {BoxedContainer, CenteredContainer, FormContainer, Link, Loader} from '../../components/atoms'
import {Stack, Typography} from '@mui/material'
import {AuthForms, useLogin} from '../../components/templates/auth'

const LoginPage: NextPage = () => {
  const {user} = useSelector(state => state)
  const router = useRouter()
  const media = useMedia()

  useEffect(() => {
    if (!user.loading && user.username) {
      router.push(Config.HOME_PAGE_PATH).catch()
    }
  }, [user.loading])

  if (user.loading) {
    return <Loader />
  }

  return (
    <BoxedContainer minHeight={'50vh'}>
      <CenteredContainer p={2}>
        <FormContainer>
          <AuthForms getFormDetails={useLogin} redirectTo={Config.HOME_PAGE_PATH} />
        </FormContainer>
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
          <Link href={Config.FORGOT_PASSWORD_PAGE_PATH}>Forgot password</Link>
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

export default LoginPage

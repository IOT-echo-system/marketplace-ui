import type {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next'
import {CMSService} from '../services'
import {BoxedContainer, Button, Link} from '../components/atoms'
import {ButtonGroup, Stack, Typography} from '@mui/material'
import React from 'react'
import {Config} from '../config'

const ErrorPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  return (
    <BoxedContainer pt={4}>
      <Stack bgcolor={'background.paper'} p={4} spacing={2}>
        <Typography variant={'h4'} component={'h1'}>
          Page not found
        </Typography>
        <Typography>
          Oops! It seems like the page you were trying to find isn't around anymore (or at least isn't here).
        </Typography>
        <ButtonGroup>
          <Button variant={'outlined'} component={Link} href={Config.HOME_PAGE_PATH}>
            Home
          </Button>
          <Button variant={'outlined'} component={Link} href={Config.MY_ACCOUNT_PAGE_PATH}>
            Profile
          </Button>
          <Button variant={'outlined'} component={Link} href={Config.LOGIN_PAGE_PATH}>
            Login
          </Button>
        </ButtonGroup>
      </Stack>
    </BoxedContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const initialValue = await CMSService.getInitialValue()
    return {props: {initialValue}, revalidate: 84600}
  } catch (error) {
    return {props: {}, revalidate: 120}
  }
}

export default ErrorPage

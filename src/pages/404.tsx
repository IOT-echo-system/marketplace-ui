import type {NextPage} from 'next'
import {BoxedContainer, Button, Link} from '../components/atoms'
import {ButtonGroup, Stack, Typography} from '@mui/material'
import React, {useEffect} from 'react'
import {Config} from '../config'
import {CMSService} from '../services'
import {updateSite} from '../store/actions'
import {useDispatch} from '../hooks'

const ErrorPage: NextPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    CMSService.getSiteInfoWithHeaderAndFooter()
      .then((siteInfo) => {
        dispatch(updateSite(siteInfo))
      })
  }, [])

  return (
    <BoxedContainer pt={4}>
      <Stack bgcolor={'background.paper'} p={4} spacing={2}>
        <Typography variant={'h4'} component={'h1'}>
          Page not found
        </Typography>
        <Typography>
          Oops! It seems like the page you were trying to find isn't around anymore (or at least isn't here).
        </Typography>
        <Stack>
          <Typography variant={'subtitle1'}>
            Go to
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
      </Stack>
    </BoxedContainer>
  )
}

export default ErrorPage

import type {PropsWithChildren} from 'react'
import React from 'react'
import {useSelector} from '../../../hooks'
import {BoxedContainer, Loader} from '../../atoms'
import {Stack, Typography} from '@mui/material'
import {ProfileSidebar} from '../../molecules'

type ProfileWrapperPropsType = PropsWithChildren<{requiredLoggedIn: boolean; title?: string}>
export const ProfileWrapper: React.FC<ProfileWrapperPropsType> = ({children, requiredLoggedIn, title}) => {
  const {user} = useSelector(state => state)

  return (
    <BoxedContainer pt={2} pb={2}>
      <Stack direction={'row'} spacing={2}>
        <Stack bgcolor={'background.paper'} width={'20%'} pt={2} pb={2}>
          <ProfileSidebar requiredLoggedIn={requiredLoggedIn} />
        </Stack>
        <Stack bgcolor={'background.paper'} p={4} width={'80%'}>
          <Stack spacing={2} width={'100%'}>
            <Typography variant={'h5'} component={'h1'}>
              {title}
            </Typography>
            <Stack width={'100%'} height={'100%'}>
              {user.loading ? <Loader /> : <>{children}</>}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </BoxedContainer>
  )
}

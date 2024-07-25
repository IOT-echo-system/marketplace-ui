import type {PropsWithChildren} from 'react'
import React from 'react'
import {useSelector} from '../../../hooks'
import {BoxedContainer, Loader, Sidebar} from '../../atoms'
import {Stack, Typography} from '@mui/material'
import {ProfileSidebar} from './components/ProfileSidebar'

type ProfileWrapperPropsType = PropsWithChildren<{requiredLoggedIn: boolean; title?: string}>
export const ProfileWrapper: React.FC<ProfileWrapperPropsType> = ({children, requiredLoggedIn, title}) => {
  const {user} = useSelector(state => state)

  return (
    <BoxedContainer pt={{xs: 1, md: 2}} pb={{xs: 1, md: 2}} direction={{md: 'row'}} spacing={2}>
      <Stack bgcolor={'background.paper'} width={{xs: '100%', md: '25%'}} pt={2} pb={2}>
        <Sidebar title={''} mobileTitle={title}>
          <ProfileSidebar requiredLoggedIn={requiredLoggedIn} />
        </Sidebar>
      </Stack>
      <Stack bgcolor={'background.paper'} spacing={2} width={'100%'} mt={{md: 0, xs: 2}} p={{xs: 1, md: 2}}>
        <Stack spacing={2}>
          <Typography variant={'h5'} component={'h1'}>
            {title}
          </Typography>
          <Stack width={'100%'} height={'100%'}>
            {user.loading ? <Loader /> : <>{children}</>}
          </Stack>
        </Stack>
      </Stack>
    </BoxedContainer>
  )
}

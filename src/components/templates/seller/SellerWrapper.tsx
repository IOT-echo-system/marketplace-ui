import type {PropsWithChildren} from 'react'
import React from 'react'
import {useSelector} from '../../../hooks'
import {Loader, Sidebar, WiderBoxedContainer} from '../../atoms'
import {Stack, Typography} from '@mui/material'
import {SellerSidebar} from './components/SellerSidebar'

type ProfileWrapperPropsType = PropsWithChildren<{title?: string}>
export const SellerWrapper: React.FC<ProfileWrapperPropsType> = ({children, title}) => {
  const {user} = useSelector(state => state)

  return (
    <WiderBoxedContainer pt={{xs: 1, md: 2}} pb={{xs: 1, md: 2}} direction={{md: 'row'}} spacing={2}>
      <Stack bgcolor={'background.paper'} width={{xs: '100%', md: '20%'}} pt={2} pb={2}>
        <Sidebar title={''} mobileTitle={title}>
          <SellerSidebar />
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
    </WiderBoxedContainer>
  )
}

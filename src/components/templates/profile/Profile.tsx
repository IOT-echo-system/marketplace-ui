import React from 'react'
import {useDispatch, useSelector} from '../../../hooks'
import {BoxedContainer, MenuItemLink} from '../../atoms'
import {MenuItem, Stack, Typography} from '@mui/material'
import {storage, StorageKeys} from '../../../utils/storage'
import {Config} from '../../../config'
import {useRouter} from 'next/router'
import {setUser} from '../../../store/actions/user'
import {initUserState} from '../../../store/reducers/user'

const profileOptions = [
  {name: 'My account', link: ''},
  {name: 'Address book', link: '/password'},
  {name: 'Wishlist', link: '/password'},
  {name: 'Orders', link: '/password'},
  {name: 'Reward points', link: '/password'}
]

export const Profile: React.FC = () => {
  const {user} = useSelector(state => state)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogout = () => {
    storage.remove(StorageKeys.AUTH)
    router.push(Config.LOGIN_PAGE_PATH).catch()
    dispatch(setUser({...initUserState, loading: false}))
  }

  return (
    <BoxedContainer pt={2} pb={2}>
      <Stack direction={'row'} spacing={2}>
        <Stack bgcolor={'background.paper'} width={'20%'} pt={2} pb={2}>
          {profileOptions.map((profile, index) => {
            return (
              <MenuItemLink href={profile.link} key={`profile-${index}`}>
                <MenuItem sx={{textWrap: 'wrap'}}>
                  <Typography>{profile.name}</Typography>
                </MenuItem>
              </MenuItemLink>
            )
          })}
          <MenuItem sx={{textWrap: 'wrap'}} onClick={handleLogout}>
            <Typography>Logout</Typography>
          </MenuItem>
        </Stack>
        <Stack bgcolor={'background.paper'} p={2} width={'80%'}>
          <Typography variant={'h4'} component={'h1'}>
            {user.name}
          </Typography>
        </Stack>
      </Stack>
    </BoxedContainer>
  )
}

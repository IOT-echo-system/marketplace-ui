import React, {useEffect} from 'react'
import {MenuItem, Stack, Typography, useTheme} from '@mui/material'
import {useRouter} from 'next/router'
import {Config} from '../../../../config'
import {useDispatch, useSelector} from '../../../../hooks'
import {storage, StorageKeys} from '../../../../utils/storage'
import {setUser} from '../../../../store/actions'
import {initUserState} from '../../../../store/reducers'
import {MenuItemLink} from '../../../atoms'

type ProfileOption = {name: string; link: string; loggedIn: boolean; exact?: boolean}
const profileOptions: ProfileOption[] = [
  {name: 'Signup', link: Config.SIGN_UP_PAGE_PATH, loggedIn: false},
  {name: 'Login', link: Config.LOGIN_PAGE_PATH, loggedIn: false},
  {name: 'Forget password', link: Config.FORGOT_PASSWORD_PAGE_PATH, loggedIn: false},
  {name: 'My account', link: Config.MY_ACCOUNT_PAGE_PATH, loggedIn: true, exact: true},
  {name: 'Change password', link: Config.CHANGE_PASSWORD_PAGE_PATH, loggedIn: true},
  {name: 'Address book', link: Config.ADDRESS_BOOK_PAGE_PATH, loggedIn: true},
  {name: 'Wishlist', link: Config.WISHLIST_PAGE_PATH, loggedIn: true},
  {name: 'Orders', link: Config.ORDERS_PAGE_PATH, loggedIn: true},
  {name: 'Reward points', link: Config.REWARDS_PAGE_PATH, loggedIn: true}
]

const loggedInPathList = profileOptions
  .filter(option => option.loggedIn)
  .map(option => option.link)
  .concat(`${Config.ORDERS_PAGE_PATH}/[orderId]`)

export const ProfileSidebar: React.FC<{requiredLoggedIn: boolean}> = ({requiredLoggedIn}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const theme = useTheme()
  const {user} = useSelector(state => state)

  useEffect(() => {
    if (!user.loading) {
      const isLoggedIn = Boolean(user.username)
      const isOnLoggedInPath = loggedInPathList.includes(router.pathname)
      if (isLoggedIn && !isOnLoggedInPath) {
        router.push(Config.MY_ACCOUNT_PAGE_PATH).catch()
      } else if (!isLoggedIn && isOnLoggedInPath) {
        router.push(Config.LOGIN_PAGE_PATH).catch()
      }
    }
  }, [user])

  const handleLogout = () => {
    storage.remove(StorageKeys.AUTH)
    dispatch(setUser({...initUserState, loading: false}))
    router.push(Config.LOGIN_PAGE_PATH).catch()
  }

  const isMatchWithProfileLink = (profile: ProfileOption) => {
    return profile.exact ? router.pathname === profile.link : router.pathname.startsWith(profile.link)
  }

  return (
    <Stack>
      {profileOptions.map((profile, index) => {
        return (
          <MenuItem
            sx={{textWrap: 'wrap', background: isMatchWithProfileLink(profile) ? theme.palette.divider : 'inherit'}}
            key={`profile-${index}`}
            disabled={requiredLoggedIn !== profile.loggedIn}
          >
            <MenuItemLink href={profile.link} sx={{width: '100%'}}>
              <Typography>{profile.name}</Typography>
            </MenuItemLink>
          </MenuItem>
        )
      })}
      <MenuItem sx={{textWrap: 'wrap'}} onClick={handleLogout} disabled={!requiredLoggedIn}>
        <Typography>Logout</Typography>
      </MenuItem>
    </Stack>
  )
}

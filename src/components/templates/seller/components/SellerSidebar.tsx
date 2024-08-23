import React, {useEffect} from 'react'
import {MenuItem, Stack, Typography, useTheme} from '@mui/material'
import {useRouter} from 'next/router'
import {Config} from '../../../../config'
import {useSelector} from '../../../../hooks'
import {MenuItemLink} from '../../../atoms'

const sellerSidebarOptions = [
  {name: 'Dashboard', link: Config.SELLER_DASHBOARD_PAGE_PATH},
  {name: 'Online orders', link: Config.SELLER_ONLINE_ORDERS_PAGE_PATH},
  {name: 'Invoices', link: Config.SELLER_INVOICES_PAGE_PATH},
  {name: 'GST Invoices', link: Config.SELLER_GST_INVOICES_PAGE_PATH}
]

export const SellerSidebar: React.FC = () => {
  const router = useRouter()
  const theme = useTheme()
  const {user} = useSelector(state => state)

  useEffect(() => {
    if (!user.loading && user.role?.type !== 'seller') {
      router.push(Config.MY_ACCOUNT_PAGE_PATH).catch()
    }
  }, [user])

  return (
    <Stack>
      {sellerSidebarOptions.map((profile, index) => {
        return (
          <MenuItem
            sx={{textWrap: 'wrap', background: router.pathname === profile.link ? theme.palette.divider : 'inherit'}}
            key={`profile-${index}`}
          >
            <MenuItemLink href={profile.link} sx={{width: '100%'}}>
              <Typography>{profile.name}</Typography>
            </MenuItemLink>
          </MenuItem>
        )
      })}
    </Stack>
  )
}

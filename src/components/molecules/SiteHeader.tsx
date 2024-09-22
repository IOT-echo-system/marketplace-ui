import * as React from 'react'
import {AppBar, Badge, Box, IconButton, Stack, Toolbar} from '@mui/material'
import {AccountCircle, Dashboard, FavoriteBorder, Menu as MenuIcon, ShoppingCart} from '@mui/icons-material'
import {Image, Link, SearchBox, WiderBoxedContainer} from '../atoms'
import {useMedia, useSelector} from '../../hooks'
import {Config} from '../../config'

type SiteHeaderPropsType = {toggleDrawer: () => void}

const WishlistAndCartIcons: React.FC<{size?: 'small' | 'large'}> = ({size}) => {
  const {productIds} = useSelector(state => state.cart)
  const totalItems = productIds.reduce((count, {qty}) => count + qty, 0)
  const {user} = useSelector(state => state)

  return (
    <Stack direction={'row'}>
      <IconButton color="inherit" size={size ?? 'medium'}>
        <Badge color="error">
          <FavoriteBorder fontSize={size ?? 'medium'} />
        </Badge>
      </IconButton>
      <IconButton color="inherit" size={size ?? 'medium'} component={Link} href={Config.CART_PAGE_PATH}>
        <Badge color="error" badgeContent={totalItems}>
          <ShoppingCart fontSize={size ?? 'medium'} />
        </Badge>
      </IconButton>
      {user.role?.type === 'seller' && (
        <IconButton color="inherit" component={Link} href={Config.SELLER_DASHBOARD_PAGE_PATH}>
          <Dashboard fontSize={size ?? 'medium'} />
        </IconButton>
      )}
    </Stack>
  )
}

export const SiteHeader: React.FC<SiteHeaderPropsType> = ({toggleDrawer}) => {
  const {siteInfo} = useSelector(state => state.site)
  const media = useMedia()

  return (
    <Box sx={{flexGrow: 1}} width={'100%'}>
      <AppBar position="static">
        <WiderBoxedContainer>
          <Toolbar
            variant={media.tablet ? 'dense' : 'regular'}
            sx={{
              width: `calc(100% + ${media.sm ? -12 : media.tablet ? 12 : 24}px)`,
              marginLeft: `${media.sm ? 0 : -(media.tablet ? 6 : 12)}px`
            }}
          >
            {media.laptop && (
              <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}
            <Link href={Config.HOME_PAGE_PATH}>
              <Image image={{link: '/img/logo-white.png', altText: siteInfo.title}} height={media.laptop ? 32 : 48} />
            </Link>
            <Box sx={{flexGrow: 1}} />
            {!media.tablet && <SearchBox />}
            <Box sx={{flexGrow: 1}} />
            <Stack direction={'row'}>
              {!media.sm && <WishlistAndCartIcons />}
              <IconButton edge="end" color="inherit" component={Link} href={Config.MY_ACCOUNT_PAGE_PATH}>
                <AccountCircle />
              </IconButton>
            </Stack>
          </Toolbar>
          {media.tablet && (
            <WiderBoxedContainer p={1} pt={0} direction={'row'}>
              <Stack width={'100%'}>
                <SearchBox size={'small'} />
              </Stack>
              {media.sm && <WishlistAndCartIcons size={'small'} />}
            </WiderBoxedContainer>
          )}
        </WiderBoxedContainer>
      </AppBar>
    </Box>
  )
}

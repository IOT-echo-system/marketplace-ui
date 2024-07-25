import * as React from 'react'
import {AppBar, Badge, Box, IconButton, Stack, Toolbar, Typography} from '@mui/material'
import {AccountCircle, Dashboard, FavoriteBorder, Menu as MenuIcon, ShoppingCart} from '@mui/icons-material'
import {Link, LinkAsText, SearchBox, WiderBoxedContainer} from '../atoms'
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
      {user.customRole && (
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
              padding: 0,
              width: `calc(100% + ${media.sm ? -12 : media.tablet ? 36 : 48}px)`,
              marginLeft: `${media.sm ? 0 : -(media.tablet ? 18 : 24)}px`
            }}
          >
            {media.laptop && (
              <IconButton size={media.tablet ? 'small' : 'large'} edge="start" color="inherit" onClick={toggleDrawer}>
                <MenuIcon fontSize={media.tablet ? 'small' : 'large'} />
              </IconButton>
            )}
            <Typography
              variant={media.tablet ? 'subtitle1' : 'h6'}
              noWrap
              component={LinkAsText}
              ml={media.sm ? 1 : media.laptop ? 2 : 0}
              href={Config.HOME_PAGE_PATH}
            >
              {siteInfo.title}
            </Typography>
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
            <WiderBoxedContainer pb={1} direction={'row'}>
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

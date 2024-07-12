import * as React from 'react'
import {AppBar, Badge, Box, IconButton, Stack, Toolbar, Typography} from '@mui/material'
import {AccountCircle, FavoriteBorder, Menu as MenuIcon, ShoppingCart} from '@mui/icons-material'
import {SearchBox, WiderBoxedContainer} from '../atoms'
import {useMedia, useSelector} from '../../hooks'

type SiteHeaderPropsType = {toggleDrawer: () => void}

const WishlistAndCartIcons: React.FC<{size?: 'small' | 'large'}> = ({size}) => {
  return (
    <Stack direction={'row'}>
      <IconButton color="inherit" size={size ?? 'medium'}>
        <Badge color="error">
          <FavoriteBorder fontSize={size ?? 'medium'} />
        </Badge>
      </IconButton>
      <IconButton color="inherit" size={size ?? 'medium'}>
        <Badge color="error">
          <ShoppingCart fontSize={size ?? 'medium'} />
        </Badge>
      </IconButton>
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
              component="div"
              ml={media.sm ? 1 : media.laptop ? 2 : 0}
            >
              {siteInfo.title}
            </Typography>
            <Box sx={{flexGrow: 1}} />
            {!media.tablet && <SearchBox />}
            <Box sx={{flexGrow: 1}} />
            <Stack direction={'row'}>
              {!media.sm && <WishlistAndCartIcons />}
              <IconButton edge="end" color="inherit">
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

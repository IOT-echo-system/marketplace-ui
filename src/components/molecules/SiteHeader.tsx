import * as React from 'react'
import {alpha, AppBar, Badge, Box, IconButton, InputBase, styled, Toolbar, Typography} from '@mui/material'
import {AccountCircle, Menu as MenuIcon, Search as SearchIcon, ShoppingCart} from '@mui/icons-material'
import {WiderBoxedContainer} from '../atoms'
import {useMedia, useSelector} from '../../hooks'

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  },
  [theme.breakpoints.up('md')]: {
    width: theme.spacing(54)
  },
  [theme.breakpoints.up('lg')]: {
    width: theme.spacing(80)
  }
}))

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

type SiteHeaderPropsType = {toggleDrawer: () => void}

export const SiteHeader: React.FC<SiteHeaderPropsType> = ({toggleDrawer}) => {
  const {siteInfo} = useSelector(state => state.site)
  const media = useMedia()

  return (
    <Box sx={{flexGrow: 1}} width={'100%'}>
      <AppBar position="static">
        <WiderBoxedContainer>
          <Toolbar>
            {media.laptop && (
              <IconButton size="large" edge="start" color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap component="div">
              {siteInfo.title}
            </Typography>
            <Box sx={{flexGrow: 1}} />
            {!media.tablet && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search…" inputProps={{'aria-label': 'search'}} />
              </Search>
            )}
            <Box sx={{flexGrow: 1}} />
            <Box>
              <IconButton color="inherit">
                <Badge color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton edge="end" color="inherit">
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
          {media.tablet && (
            <WiderBoxedContainer pb={1}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search…" inputProps={{'aria-label': 'search'}} />
              </Search>
            </WiderBoxedContainer>
          )}
        </WiderBoxedContainer>
      </AppBar>
    </Box>
  )
}

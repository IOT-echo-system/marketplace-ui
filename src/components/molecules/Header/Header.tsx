import {AppBar, Badge, Box, IconButton, Toolbar, Typography} from '@mui/material'
import React from 'react'
import {ShoppingCart} from '@mui/icons-material'
import {Menu, AccountCircle} from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import {useSelector} from '../../../hooks'
import {FooterContainer, Search, SearchIconWrapper, StyledInputBase} from './StyledHeader'

export const Header: React.FC = () => {
  const site = useSelector(state => state.site)

  return (
    <FooterContainer justifyContent={'center'}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{mr: 1}}>
            <Menu />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            {site.title}
          </Typography>
          <Search sx={{display: {xs: 'none', md: 'block'}}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{'aria-label': 'search'}} />
          </Search>
          <Box sx={{flexGrow: 1}} />
          <Box sx={{display: 'flex'}}>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={1} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </FooterContainer>
  )
}

import React from 'react'
import {useMedia, useSelector} from '../../hooks'
import {Drawer, IconButton, Stack, styled} from '@mui/material'
import {MenuItem, WiderBoxedContainer} from '../atoms'
import {Close} from '@mui/icons-material'

const Container = styled(Stack)(({theme}) => ({
  background: theme.palette.common.white,
  width: '100%',
  '&>*': {
    padding: theme.spacing(2)
  }
}))

const MobileMenuContainer = styled(Stack)(({theme}) => ({
  borderTop: `1px solid ${theme.palette.background.default}`,
  minHeight: `calc(100vh - ${theme.spacing(6)})`,
  background: theme.palette.common.white,
  top: theme.spacing(6),
  width: theme.spacing(32),
  '&>*': {
    borderBottom: `1px solid ${theme.palette.background.default}`,
    padding: theme.spacing(2)
  }
}))

type MenubarPropsType = {toggleDrawer: () => void; open: boolean}
export const Menubar: React.FC<MenubarPropsType> = ({toggleDrawer, open}) => {
  const menus = useSelector(state => state.site.header.menus)
  const media = useMedia()

  if (!media.laptop) {
    return (
      <Container>
        <WiderBoxedContainer direction={'row'} spacing={{md: 2, lg: 4}}>
          {menus.map(({name, link}) => (
            <MenuItem key={link} link={link} label={name} />
          ))}
        </WiderBoxedContainer>
      </Container>
    )
  }

  return (
    <Drawer open={open} onClose={toggleDrawer} anchor={'left'}>
      <MobileMenuContainer>
        <Stack justifyContent={'right'} direction={'row'} alignItems={'center'} p={0.3} pr={2}>
          <IconButton onClick={toggleDrawer}>
            <Close />
          </IconButton>
        </Stack>
        {menus.map(({name, link}) => (
          <Stack key={link} onClick={toggleDrawer}>
            <MenuItem link={link} label={name} />
          </Stack>
        ))}
      </MobileMenuContainer>
    </Drawer>
  )
}

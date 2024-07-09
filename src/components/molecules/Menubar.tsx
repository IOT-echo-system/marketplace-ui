import React, {useState} from 'react'
import {useMedia, useSelector} from '../../hooks'
import {Drawer, IconButton, Stack, styled} from '@mui/material'
import {MenuItem} from '../atoms'
import {Close, Menu} from '@mui/icons-material'

const Container = styled(Stack)(({theme}) => ({
  background: theme.palette.common.white,
  flexDirection: 'row',
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

export const Menubar: React.FC = () => {
  const menus = useSelector(state => state.site.header.menus)
  const media = useMedia()
  const [open, setOpen] = useState(false)

  const handleMobileMenu = (open: boolean) => () => {
    setOpen(open)
  }

  return (
    <>
      {media.md && (
        <IconButton onClick={handleMobileMenu(true)} aria-label={'Menu'}>
          <Menu />
        </IconButton>
      )}
      {!media.md ? (
        <Container>
          {menus.map(({label, link, newTab}) => (
            <MenuItem key={link} link={link} label={label} newTab={newTab} />
          ))}
        </Container>
      ) : (
        <Drawer open={open} onClose={handleMobileMenu(false)} anchor={'right'}>
          <MobileMenuContainer>
            <Stack justifyContent={'right'} direction={'row'} alignItems={'center'} p={0.3} pr={2}>
              <IconButton onClick={handleMobileMenu(false)}>
                <Close />
              </IconButton>
            </Stack>
            {menus.map(({label, link, newTab}) => (
              <Stack key={link} onClick={handleMobileMenu(false)}>
                <MenuItem link={link} label={label} newTab={newTab} />
              </Stack>
            ))}
          </MobileMenuContainer>
        </Drawer>
      )}
    </>
  )
}

import React, {useState} from 'react'
import {ScreenWidth, useMedia, useSelector} from '../../hooks'
import type {StackProps} from '@mui/material'
import {Box, Drawer, IconButton, Stack, styled, Typography} from '@mui/material'
import {Link, WiderBoxedContainer} from '../atoms'
import {Close, NavigateNext} from '@mui/icons-material'
import type {MainMenuResponse} from '../../services/typing/CMSService'

const Container = styled(Stack)(({theme}) => ({
  background: theme.palette.common.white,
  width: '100%'
}))

const MobileMenuContainer = styled(Stack)(({theme}) => ({
  borderTop: `1px solid ${theme.palette.background.default}`,
  minHeight: `calc(100vh - ${theme.spacing(6)})`,
  background: theme.palette.common.white,
  top: theme.spacing(6),
  width: '100vw',
  '&>*': {
    borderBottom: `1px solid ${theme.palette.background.default}`,
    padding: theme.spacing(0, 2)
  }
}))

const SubmenuContainer = styled(Stack)<
  StackProps & {
    last?: 'true' | 'false'
    row?: 'true' | 'false'
  }
>(({theme, last, row}) => {
  const isRow = row === 'true'
  const isNotLast = last === 'false'
  return {
    zIndex: 5,
    position: 'absolute',
    top: theme.spacing(isRow ? -0.125 : 4.5),
    left: theme.spacing(isRow ? 30 : 0),
    [theme.breakpoints.down('xl')]: {
      left: isNotLast ? theme.spacing(isRow ? 30 : 0) : 'auto',
      right: isNotLast ? 'auto' : theme.spacing(isRow ? 30 : 0)
    },
    [theme.breakpoints.down('lg')]: {
      left: isNotLast ? theme.spacing(isRow ? 24 : 0) : 'auto',
      right: isNotLast ? 'auto' : theme.spacing(isRow ? 24 : 0)
    },
    [`@media (max-width:${ScreenWidth.LAPTOP - 0.05}px)`]: {
      position: 'relative',
      left: 'unset',
      right: 'unset',
      top: 'unset',
      '& > *': {
        width: '100%',
        boxShadow: 'none'
      }
    }
  }
})

const NavMenuItemContainer = styled(Stack)<StackProps & {row?: 'true' | 'false'}>(({theme, row}) => {
  const isRow = row === 'true'
  return {
    borderTop: isRow ? `1px solid ${theme.palette.grey[200]}` : 0,
    padding: isRow ? theme.spacing(0.5, 2) : 0,
    [`@media (max-width:${ScreenWidth.LAPTOP - 0.05}px)`]: {
      borderTop: 0,
      borderLeft: isRow ? `1px solid ${theme.palette.grey[300]}` : 0
    }
  }
})

type MenubarPropsType = {toggleDrawer: () => void; open: boolean}

type NavMenuItemPropsType = {
  menuItem: MainMenuResponse
  direction?: 'row' | 'column'
  isLastElement?: boolean
  onClose?: () => void
  closeDrawer?: () => void
}
const NavMenuItem: React.FC<NavMenuItemPropsType> = ({menuItem, direction, isLastElement, onClose, closeDrawer}) => {
  const media = useMedia()
  const [open, setOpen] = useState(false)
  const [clicked, setClicked] = useState(false)
  const handleOpen = (state: boolean) => () => {
    setOpen(state)
  }
  const handleClose = () => {
    setClicked(!clicked)
    if (!media.laptop) {
      if (onClose) {
        onClose()
      }
      setOpen(false)
    } else if (!menuItem.children?.length && closeDrawer) {
      closeDrawer()
    } else {
      setOpen(!clicked && Boolean(menuItem.children?.length))
    }
  }

  const isRow = direction === 'row'
  return (
    <NavMenuItemContainer
      onMouseEnter={handleOpen(true)}
      position={'relative'}
      onMouseLeave={media.laptop ? () => ({}) : handleOpen(false)}
      row={isRow ? 'true' : 'false'}
    >
      <Link
        href={`/categories/${menuItem.link}`}
        sx={{color: 'inherit', '&:hover': {textDecoration: 'none', color: 'inherit'}}}
        onClick={handleClose}
      >
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography p={isRow ? 0 : 0.5}>{menuItem.name}</Typography>
          {isRow && (menuItem.children?.length ?? 0) > 0 && <NavigateNext fontSize={'small'} />}
        </Stack>
      </Link>
      {open && (menuItem.children?.length ?? 0) > 0 && (
        <SubmenuContainer row={isRow ? 'true' : 'false'} last={isLastElement ? 'true' : 'false'}>
          <Box
            boxShadow={media.laptop ? 0 : 2}
            bgcolor={'background.paper'}
            onMouseEnter={handleOpen(true)}
            onMouseLeave={handleOpen(false)}
            width={media.laptop ? 'auto' : media.lg ? 192 : 240}
          >
            <Stack width={'100%'} position={'relative'}>
              {menuItem.children?.map(child => {
                return (
                  <NavMenuItem
                    menuItem={child}
                    key={child.link}
                    direction={'row'}
                    isLastElement={isLastElement}
                    onClose={handleClose}
                    closeDrawer={closeDrawer}
                  />
                )
              })}
            </Stack>
          </Box>
        </SubmenuContainer>
      )}
    </NavMenuItemContainer>
  )
}

export const Menubar: React.FC<MenubarPropsType> = ({toggleDrawer, open}) => {
  const menus = useSelector(state => state.site.header.menus)
  const media = useMedia()

  if (!media.laptop) {
    return (
      <Container>
        <WiderBoxedContainer direction={'row'} spacing={{md: 1, lg: 4}}>
          {menus.map((menuItem, index) => (
            <NavMenuItem key={menuItem.link} menuItem={menuItem} isLastElement={index >= menus.length - 2} />
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
        {menus.map(menuItem => (
          <NavMenuItem key={menuItem.link} menuItem={menuItem} closeDrawer={toggleDrawer} />
        ))}
      </MobileMenuContainer>
    </Drawer>
  )
}

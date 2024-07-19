import type {PropsWithChildren} from 'react'
import React, {useState} from 'react'
import type {StackProps} from '@mui/material'
import {Stack, styled, Typography} from '@mui/material'
import {ScreenWidth, useMedia} from '../../hooks'

export const FixedContainer = styled(Stack)<StackProps>(({theme}) => ({
  position: 'fixed',
  left: 0,
  width: '100%',
  top: theme.spacing(8),
  [`@media (max-width:${ScreenWidth.TABLET - 0.05}px)`]: {
    top: theme.spacing(11)
  },
  [theme.breakpoints.down('sm')]: {
    top: theme.spacing(11.5)
  },
  background: theme.palette.background.paper,
  zIndex: 3,
  boxShadow: theme.shadows[4]
}))

const Container = styled(Stack)<StackProps>(({theme}) => ({
  maxHeight: `calc(100vh - ${theme.spacing(12)})`,
  background: theme.palette.background.paper,
  overflowY: 'auto'
}))

type SidebarPropsType = PropsWithChildren<{title?: string; mobileTitle?: string}>

export const Sidebar: React.FC<SidebarPropsType> = ({children, title, mobileTitle}) => {
  const media = useMedia()
  const [open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen(!open)
  }

  if (media.md) {
    return (
      <FixedContainer>
        <Typography
          variant={'subtitle1'}
          component={'h2'}
          p={1}
          onClick={toggleOpen}
          whiteSpace={'nowrap'}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
        >
          {mobileTitle ?? title}
        </Typography>
        {open && <Container>{children}</Container>}
      </FixedContainer>
    )
  }

  return (
    <Stack spacing={1}>
      {title && (
        <Stack p={2} pb={0}>
          <Typography variant={'h5'} component={'h2'}>
            {title}
          </Typography>
        </Stack>
      )}
      {children}
    </Stack>
  )
}

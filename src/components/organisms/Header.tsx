import React, {useState} from 'react'
import {Stack, styled} from '@mui/material'
import {Menubar, SiteHeader} from '../molecules'

const Container = styled(Stack)(({theme}) => ({
  background: theme.palette.common.white,
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: theme.shadows[2],
  position: 'fixed',
  zIndex: 999,
  width: '100%',
  minHeight: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    minHeight: theme.spacing(6)
  }
}))

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false)
  const toggleDrawer = () => {
    setOpen(!open)
  }
  return (
    <Container>
      <SiteHeader toggleDrawer={toggleDrawer} />
      <Menubar toggleDrawer={toggleDrawer} open={open} />
    </Container>
  )
}

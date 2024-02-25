import type {PropsWithChildren} from 'react'
import React from 'react'
import {Footer, Header} from '../molecules'
import {Box, Stack} from '@mui/material'

export const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <Stack sx={{minHeight: '100vh'}}>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <Box sx={{flexGrow: 1}} />
      <footer>
        <Footer />
      </footer>
    </Stack>
  )
}

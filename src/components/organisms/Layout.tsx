import type {PropsWithChildren} from 'react'
import React from 'react'
import {Stack, styled} from '@mui/material'
import {Header} from './Header'
import {useMedia} from '../../hooks'
import {Footer} from './Footer'

const Container = styled(Stack)(({theme}) => ({
  minHeight: '100vh',
  background: theme.palette.background.default
}))

export const Layout: React.FC<PropsWithChildren> = ({children}) => {
  const media = useMedia()

  return (
    <Container justifyContent={'space-between'}>
      <Stack>
        <header>
          <Header />
        </header>
        <main>
          <Stack mt={media.md ? 6 : 8}>{children}</Stack>
        </main>
      </Stack>
      <footer>
        <Footer />
      </footer>
    </Container>
  )
}

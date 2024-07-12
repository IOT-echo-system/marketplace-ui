import type {PropsWithChildren} from 'react'
import React from 'react'
import {Stack, styled} from '@mui/material'
import {Header} from './Header'
import {Footer} from './Footer'
import {useMedia} from '../../hooks'

const Container = styled(Stack)(({theme}) => ({
  minHeight: '100vh',
  minWidth: '100vw',
  background: theme.palette.background.default
}))

export const Layout: React.FC<PropsWithChildren> = ({children}) => {
  const media = useMedia()
  const getMt = () => {
    if (media.sm) {
      return 12
    }
    if (media.tablet) {
      return 14
    }
    if (media.md || media.laptop) {
      return 8
    }
    return 15
  }

  return (
    <Container justifyContent={'space-between'}>
      <Stack>
        <header>
          <Header />
        </header>
        <main>
          <Stack mt={getMt()}>{children}</Stack>
        </main>
      </Stack>
      <footer>
        <Footer />
      </footer>
    </Container>
  )
}

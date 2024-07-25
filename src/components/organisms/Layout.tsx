import type {PropsWithChildren} from 'react'
import React from 'react'
import {Stack, styled} from '@mui/material'
import {Header} from './Header'
import {Footer} from './Footer'
import {useMedia} from '../../hooks'

const Container = styled(Stack)(() => ({
  minHeight: '100vh',
  minWidth: '100vw'
}))

export const Layout: React.FC<PropsWithChildren<{bgcolor?: string}>> = ({children, bgcolor}) => {
  const media = useMedia()
  const getMt = () => {
    if (media.sm || (media.md && media.tablet)) {
      return 11.5
    }
    if (media.md) {
      return 8.5
    }
    if (media.laptop) {
      return 8
    }
    return 13.5
  }

  return (
    <Container justifyContent={'space-between'} bgcolor={bgcolor ?? 'background.paper'}>
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

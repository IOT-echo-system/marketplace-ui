import React from 'react'
import {ThemeProvider} from '@mui/material'
import '../../styles/globals.css'
import theme from '../theme/theme'
import StoreProvider from '../store/configureStore'
import {Layout} from '../components/organisms'
import type {AppProps} from 'next/app'
import type {TRootState} from '../typing/store'

const MyApp: React.FC<AppProps<{initialValue?: TRootState}>> = ({Component, pageProps, router}) => {
  return (
    <StoreProvider initialValue={pageProps.initialValue}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} key={router.asPath} />
        </Layout>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default MyApp

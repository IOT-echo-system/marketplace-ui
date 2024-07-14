import React from 'react'
import {ThemeProvider} from '@mui/material'
import '../../styles/globals.css'
import theme from '../theme/theme'
import StoreProvider from '../store/configureStore'
import {Layout} from '../components/organisms'
import type {AppProps} from 'next/app'
import type {TRootState} from '../typing/store'
import {ToastWrapper} from '../components/atoms'
import {ValidatedProfile} from '../components/molecules'

const MyApp: React.FC<AppProps<{initialValue?: TRootState}>> = ({Component, pageProps, router}) => {
  return (
    <StoreProvider initialValue={pageProps.initialValue}>
      <ThemeProvider theme={theme}>
        <ToastWrapper>
          <ValidatedProfile>
            <Layout>
              <Component {...pageProps} key={router.asPath} />
            </Layout>
          </ValidatedProfile>
        </ToastWrapper>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default MyApp

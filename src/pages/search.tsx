import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import {CMSService} from '../services'
import {Stack} from '@mui/material'
import * as React from 'react'

const SearchPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  return <Stack>Search page</Stack>
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialValue = await CMSService.getInitialValue('background.default')
    return {props: {initialValue}}
  } catch (error) {
    return {props: {}}
  }
}

export default SearchPage

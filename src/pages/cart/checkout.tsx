import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import React from 'react'
import {Checkout} from '../../components/templates/checkout/Checkout'
import {CMSService} from '../../services'
import {Stack} from '@mui/material'

const CheckoutPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  return (
    <Stack bgcolor={'background.default'}>
      {' '}
      <Checkout />
    </Stack>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialValue = await CMSService.getInitialValue()
    return {props: {initialValue}}
  } catch (error) {
    return {props: {}}
  }
}

export default CheckoutPage

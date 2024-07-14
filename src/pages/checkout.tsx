import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import {CMSService} from '../services'
import React from 'react'
import {Checkout} from '../components/templates/checkout/Checkout'

const CheckoutPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  return <Checkout />
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

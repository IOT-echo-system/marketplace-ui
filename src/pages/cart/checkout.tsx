import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import React from 'react'
import {Checkout} from '../../components/templates/checkout/Checkout'
import {CMSService} from '../../services'

const CheckoutPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  return <Checkout />
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialValue = await CMSService.getInitialValue('background.default')
    return {props: {initialValue}}
  } catch (error) {
    return {props: {}}
  }
}

export default CheckoutPage

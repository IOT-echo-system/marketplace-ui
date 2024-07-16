import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import React from 'react'
import {ShoppingCart} from '../../components/templates/shoppingCart/ShoppingCart'
import {CMSService} from '../../services'

const CartPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  return <ShoppingCart />
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialValue = await CMSService.getInitialValue()
    return {props: {initialValue}}
  } catch (error) {
    return {props: {}}
  }
}

export default CartPage

import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import React from 'react'
import {Order, ProfileWrapper} from '../../../components/templates/profile'
import {CMSService} from '../../../services'
import {useRouter} from 'next/router'

const OrderPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  const router = useRouter()
  return (
    <ProfileWrapper requiredLoggedIn title={`Order ${router.query.orderId as string}`}>
      <Order />
    </ProfileWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialValue = await CMSService.getInitialValue('background.default')
    return {props: {initialValue}}
  } catch (error) {
    return {props: {}}
  }
}

export default OrderPage

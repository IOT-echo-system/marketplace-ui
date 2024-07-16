import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import React from 'react'
import {CMSService} from '../../services'
import {Orders} from '../../components/templates/profile/Orders'
import {ProfileWrapper} from '../../components/templates/profile/ProfileWrapper'

const OrdersPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  return (
    <ProfileWrapper requiredLoggedIn>
      <Orders />
    </ProfileWrapper>
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

export default OrdersPage

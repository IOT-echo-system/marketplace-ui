import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import React from 'react'
import {Orders, ProfileWrapper} from '../../../components/templates/profile'
import {CMSService} from '../../../services'

const OrdersPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  return (
    <ProfileWrapper requiredLoggedIn title={'Orders'}>
      <Orders />
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

export default OrdersPage

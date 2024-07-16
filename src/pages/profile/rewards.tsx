import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import React from 'react'
import {CMSService} from '../../services'
import {ProfileWrapper} from '../../components/templates/profile/ProfileWrapper'
import {Typography} from '@mui/material'
import {InProgressFeature} from '../../components/atoms'

const OrdersPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  return (
    <ProfileWrapper requiredLoggedIn>
      <Typography variant={'h4'} component={'h1'}>
        Rewards
      </Typography>
      <InProgressFeature />
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

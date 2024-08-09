import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import React from 'react'
import {MyAccount, ProfileWrapper} from '../../components/templates/profile'
import {CMSService} from '../../services'

const MyAccountPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  return (
    <ProfileWrapper requiredLoggedIn title={'My account'}>
      <MyAccount />
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

export default MyAccountPage

import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import React from 'react'
import {CMSService} from '../../services'
import {ProfileWrapper} from '../../components/templates/profile/ProfileWrapper'
import {Addresses} from '../../components/templates/profile/Addresses'

const AddressPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  return (
    <ProfileWrapper requiredLoggedIn>
      <Addresses />
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

export default AddressPage

import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import React from 'react'
import {CMSService} from '../../services'
import {Addresses, ProfileWrapper} from '../../components/templates/profile'
import {useSelector} from '../../hooks'

const AddressPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  const {addresses} = useSelector(state => state.address)
  return (
    <ProfileWrapper requiredLoggedIn title={`Address (${addresses.length})`}>
      <Addresses />
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

export default AddressPage

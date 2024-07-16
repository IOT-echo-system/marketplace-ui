import type {GetServerSideProps, NextPage} from 'next'
import React from 'react'
import {InProgressFeature} from '../../components/atoms'
import {CMSService} from '../../services'
import {ProfileWrapper} from '../../components/templates/profile/ProfileWrapper'

const ForgotPasswordPage: NextPage = () => {
  return (
    <ProfileWrapper requiredLoggedIn={false} title={'Forget password'}>
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

export default ForgotPasswordPage

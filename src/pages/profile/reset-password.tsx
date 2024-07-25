import type {GetServerSideProps, NextPage} from 'next'
import React from 'react'
import {InProgressFeature} from '../../components/atoms'
import {CMSService} from '../../services'
import {ProfileWrapper} from '../../components/templates/profile/ProfileWrapper'

const ResetPasswordPage: NextPage = () => {
  return (
    <ProfileWrapper requiredLoggedIn title={'Reset password'}>
      <InProgressFeature />
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

export default ResetPasswordPage

import type {GetServerSideProps, NextPage} from 'next'
import React from 'react'
import {CMSService} from '../../services'
import {ProfileWrapper} from '../../components/templates/profile'
import {AuthForms, useForgetPassword} from '../../components/templates/auth'
import {CenteredContainer} from '../../components/atoms'

const ForgotPasswordPage: NextPage = () => {
  return (
    <ProfileWrapper requiredLoggedIn={false}>
      <CenteredContainer spacing={2}>
        <AuthForms getFormDetails={useForgetPassword} />
      </CenteredContainer>
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

export default ForgotPasswordPage

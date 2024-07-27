import type {GetServerSideProps, NextPage} from 'next'
import React from 'react'
import {CMSService} from '../../services'
import {ProfileWrapper} from '../../components/templates/profile'
import {AuthForms} from '../../components/templates/auth'
import {CenteredContainer} from '../../components/atoms'
import {useResetPassword} from '../../components/templates/auth/useResetPassword'

const ResetPasswordPage: NextPage = () => {
  return (
    <ProfileWrapper requiredLoggedIn title={''}>
      <CenteredContainer p={2} spacing={2}>
        <AuthForms getFormDetails={useResetPassword} withOldPassword/>
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

export default ResetPasswordPage

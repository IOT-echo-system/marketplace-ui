import React from 'react'
import {Divider, Stack} from '@mui/material'
import {AuthForms, useLogin, useSignUp} from '../auth'
import type {CheckoutStatePropsType} from './Checkout'
import {useMedia} from '../../../hooks'

export const AccountDetails: React.FC<CheckoutStatePropsType> = ({onSuccess}) => {
  const media = useMedia()
  return (
    <Stack direction={media.md ? 'column' : 'row'} justifyContent={'space-around'} spacing={media.md ? 2 : 4}>
      <Stack width={'100%'} p={media.sm ? 0 : 2}>
        <AuthForms getFormDetails={useSignUp} onSuccess={onSuccess} title={'New customer'} />
      </Stack>
      <Stack>
        <Divider orientation={media.md ? 'horizontal' : 'vertical'} />
      </Stack>
      <Stack width={'100%'} p={media.sm ? 0 : 2}>
        <AuthForms getFormDetails={useLogin} onSuccess={onSuccess} title={'Returning customer'} />
      </Stack>
    </Stack>
  )
}

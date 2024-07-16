import React from 'react'
import {Stack, Typography} from '@mui/material'
import type {AddressType} from '../../store/reducers/address'

type AddressPropsType = {address: AddressType; title: string}

export const Address: React.FC<AddressPropsType> = ({address, title}) => {
  return (
    <Stack flexWrap={'wrap'}>
      <Typography variant={'subtitle1'}>{title}</Typography>
      <Typography flexWrap={'wrap'}>
        {address.name} ({address.mobileNo})
      </Typography>
      <Typography flexWrap={'wrap'}>
        {address.address1} {address.address2} {address.address2}{' '}
      </Typography>
      <Typography flexWrap={'wrap'}>
        {address.city} {address.district} {address.state} - {address.pinCode}{' '}
      </Typography>
    </Stack>
  )
}

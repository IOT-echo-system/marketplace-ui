import React from 'react'
import {Stack} from '@mui/material'
import {useSelector} from '../../../hooks'
import {Address, Button} from '../../atoms'
import {AddAddress} from '../../organisms/ModalForms'
import {ModalForms} from '../../organisms'

export const Addresses: React.FC = () => {
  const {addresses} = useSelector(state => state.address)
  return (
    <Stack spacing={2}>
      <Stack spacing={4}>
        {addresses.map(address => (
          <Address key={address.id} address={address} title={''} />
        ))}
      </Stack>
      <ModalForms getFormDetails={AddAddress}>
        <Stack direction={'row'}>
          <Button variant={'contained'}>Add new address</Button>
        </Stack>
      </ModalForms>
    </Stack>
  )
}

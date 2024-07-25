import React, {useState} from 'react'
import {Divider, Radio, RadioGroup, Stack, Typography} from '@mui/material'
import type {CheckoutStatePropsType} from './Checkout'
import {useDispatch, useSelector} from '../../../hooks'
import {Button} from '../../atoms'
import {ModalForms} from '../../organisms'
import {AddAddress} from '../../organisms/ModalForms/formFunctions'
import {getStateName} from '../../../data/stateList'
import {addBillingAddress, addShippingAddress} from '../../../store/actions'

type AddressDetailsPropsType = CheckoutStatePropsType & {type: 'shipping' | 'billing'}
export const AddressDetails: React.FC<AddressDetailsPropsType> = ({onSuccess, type}) => {
  const dispatch = useDispatch()
  const {addresses} = useSelector(state => state.address)
  const [selected, setSelected] = useState(-1)

  const handleSelect = (index: number) => () => {
    setSelected(index)
  }

  const handleClick = (index: number) => () => {
    const address = addresses[index]
    const setAddress = type === 'billing' ? addBillingAddress : addShippingAddress
    dispatch(setAddress(address))
    onSuccess()
  }

  return (
    <Stack justifyContent={'space-around'}>
      <RadioGroup>
        {addresses.map((address, index) => {
          return (
            <Stack key={address.id} spacing={2} mb={2}>
              <Stack spacing={2} direction={'row'} alignItems={'start'}>
                <Radio checked={index === selected} onClick={handleSelect(index)} />
                <Stack spacing={2}>
                  <Stack direction={'row'} spacing={2} flexWrap={'wrap'}>
                    <Typography fontWeight={'bold'}>
                      {address.name} ({address.mobileNo})
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography>
                      {address.address1} {address.address2} {address.address3}
                    </Typography>
                    <Typography>
                      {address.city} {address.district} {getStateName(address.state)} - {address.pinCode}
                    </Typography>
                  </Stack>
                  {selected === index && (
                    <Stack direction={'row'}>
                      <Button onClick={handleClick(index)} variant={'contained'} color={'warning'}>
                        {type === 'shipping' ? 'Deliver here' : 'Select this'}
                      </Button>
                    </Stack>
                  )}
                </Stack>
              </Stack>
              <Divider />
            </Stack>
          )
        })}
      </RadioGroup>
      <ModalForms getFormDetails={AddAddress}>
        <Stack direction={'row'}>
          <Button variant={'contained'}>Add new address</Button>
        </Stack>
      </ModalForms>
    </Stack>
  )
}

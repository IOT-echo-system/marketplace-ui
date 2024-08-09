import React, {useEffect, useState} from 'react'
import {Divider, Radio, RadioGroup, Stack, Typography} from '@mui/material'
import type {CheckoutStatePropsType} from './Checkout'
import {useDispatch, useSelector} from '../../../hooks'
import {Button, LoadingText} from '../../atoms'
import {ModalForms} from '../../organisms'
import {AddAddress} from '../../organisms/ModalForms/formFunctions'
import {getStateName} from '../../../data/stateList'
import {addBillingAddress, addShippingAddress} from '../../../store/actions'
import {ShippingService} from '../../../services/ShippingService'

type AddressDetailsPropsType = CheckoutStatePropsType & {type: 'shipping' | 'billing'}
export const AddressDetails: React.FC<AddressDetailsPropsType> = ({onSuccess, type}) => {
  const dispatch = useDispatch()
  const {addresses} = useSelector(state => state.address)
  const [selected, setSelected] = useState(-1)
  const [estimateDelivery, setEstimateDelivery] = useState('')

  const handleSelect = (index: number) => () => {
    setSelected(index)
  }

  useEffect(() => {
    if (type === 'shipping' && selected > -1) {
      setEstimateDelivery('')
      ShippingService.estimateDelivery(addresses[selected].pinCode).then(({expectedDeliveryDate}) => {
        setEstimateDelivery(`Delivery in ${expectedDeliveryDate}`)
      })
    }
  }, [type, selected])

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
                    <Stack spacing={1}>
                      <Stack direction={'row'}>
                        <Button onClick={handleClick(index)} variant={'contained'} color={'warning'}>
                          {type === 'shipping' ? 'Deliver here' : 'Select this'}
                        </Button>
                      </Stack>
                      {type === 'shipping' && (
                        <>
                          {estimateDelivery ? (
                            <Typography>{estimateDelivery}</Typography>
                          ) : (
                            <LoadingText text={'Loading'} />
                          )}
                        </>
                      )}
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

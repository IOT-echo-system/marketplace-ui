import React, {useEffect, useState} from 'react'
import {Divider, FormControlLabel, Radio, RadioGroup, Stack, Typography} from '@mui/material'
import type {CheckoutStatePropsType} from './Checkout'
import {useDispatch, useSelector} from '../../../hooks'
import {Address, Button, LoadingText} from '../../atoms'
import {ModalForms} from '../../organisms'
import {AddAddress} from '../../organisms/ModalForms'
import {addBillingAddress, addShippingAddress} from '../../../store/actions'
import {ShippingService} from '../../../services/ShippingService'

type AddressDetailsPropsType = CheckoutStatePropsType & { type: 'shipping' | 'billing' }
export const AddressDetails: React.FC<AddressDetailsPropsType> = ({onSuccess, type}) => {
  const dispatch = useDispatch()
  const {addresses} = useSelector(state => state.address)
  const [selected, setSelected] = useState(-1)
  const [estimateDelivery, setEstimateDelivery] = useState('')

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(+event.target.value)
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
      <RadioGroup value={selected} onChange={handleSelect}>
        {addresses.map((address, index) => {
          return (
            <Stack key={address.id} spacing={2} mb={2}>
              <Stack spacing={2} alignItems={'start'}>
                <FormControlLabel
                  value={index}
                  control={<Radio style={{alignSelf: 'start'}}/>}
                  label={<Address address={address} title={''}/>}
                />
                {selected === index && (
                  <Stack spacing={1} pl={6}>
                    <Button onClick={handleClick(index)} variant={'contained'} color={'warning'}>
                      {type === 'shipping' ? 'Deliver here' : 'Select this'}
                    </Button>
                    {type === 'shipping' && (
                      <>
                        {estimateDelivery ? (
                          <Typography>{estimateDelivery}</Typography>
                        ) : (
                          <LoadingText text={'Loading'}/>
                        )}
                      </>
                    )}
                  </Stack>
                )}
              </Stack>
              <Divider/>
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

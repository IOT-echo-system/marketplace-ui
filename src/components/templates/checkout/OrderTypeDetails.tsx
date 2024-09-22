import React, {useState} from 'react'
import {FormControlLabel, Radio, RadioGroup, Stack, Typography} from '@mui/material'
import type {CheckoutStatePropsType} from './Checkout'
import {useDispatch, useMedia} from '../../../hooks'
import {Button} from '../../atoms'
import {updateOrderType} from '../../../store/actions'
import type {Order} from '../../../services/typing/userService'
import {Accordion, AccordionDetails, AccordionSummary} from '../../molecules'
import {AddressDetails} from './AddressDetails'

export const OrderTypeDetails: React.FC<CheckoutStatePropsType> = ({onSuccess}) => {
  const dispatch = useDispatch()
  const media = useMedia()
  const orderTypes: Array<{label: string; value: Order['type']}> = [
    {label: 'Pick from store', value: 'STORE_PICKUP'},
    {label: 'Home delivery', value: 'ONLINE'}
  ]

  const [value, setValue] = useState<Order['type']>(orderTypes[0].value)

  const handleClick = () => {
    if (value !== 'ONLINE') {
      onSuccess()
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const orderType = event.target.value as Order['type']
    setValue(orderType)
    dispatch(updateOrderType(orderType))
  }

  return (
    <Stack justifyContent={'space-around'} spacing={2}>
      <RadioGroup value={value} onChange={handleChange}>
        <Stack direction={media.sm ? 'column' : 'row'} spacing={media.sm ? 0 : 8} flexWrap={'wrap'}>
          {orderTypes.map(orderType => {
            return (
              <Stack key={orderType.value}>
                <FormControlLabel value={orderType.value} control={<Radio />} label={orderType.label} />
                {orderType.value === value && value === 'STORE_PICKUP' && (
                  <Button onClick={handleClick} variant={'contained'} color={'warning'}>
                    Select this
                  </Button>
                )}
              </Stack>
            )
          })}
        </Stack>
      </RadioGroup>
      {value === 'ONLINE' && (
        <Stack>
          <Accordion expanded>
            <AccordionSummary>
              <Typography>Select address</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AddressDetails type={'shipping'} onSuccess={onSuccess} />
            </AccordionDetails>
          </Accordion>
        </Stack>
      )}
    </Stack>
  )
}

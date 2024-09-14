import React from 'react'
import {Stack} from '@mui/material'
import {ModalForms} from '../../../../organisms'
import {Address, Button, ButtonAsLink} from '../../../../atoms'
import {Add} from '@mui/icons-material'
import {AddProductIntoCart, AddSellerAddress} from '../formFunctions'
import {useSelector} from '../../../../../hooks'

export const CreateOrderHeader: React.FC = () => {
  const cart = useSelector(state => state.seller.cart)
  return (
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'end'}>
      <ModalForms getFormDetails={AddProductIntoCart} type={'ADD'}>
        <Button startIcon={<Add/>} variant={'contained'} size={'large'}>
          Add item
        </Button>
      </ModalForms>
      <Stack spacing={1} alignItems={'start'}>
        {cart.billingAddress && <Address address={cart.billingAddress} title={'Billing address'}/>}
        <ModalForms getFormDetails={AddSellerAddress}>
          {cart.billingAddress
            ? <ButtonAsLink title={'Update address'}>Update address</ButtonAsLink>
            : <Button variant={'contained'} color={'warning'}>Add billing address</Button>}
        </ModalForms>
      </Stack>
    </Stack>
  )
}

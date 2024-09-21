import React, {useEffect} from 'react'
import {Checkbox, FormControlLabel, Stack} from '@mui/material'
import {Button, ButtonAsLink, PriceSummary} from '../../atoms'
import {useDispatch, useSelector} from '../../../hooks'
import {ModalForms} from '../../organisms'
import {calculateTotalQtyAndPriceFromOrder} from '../../../utils/utils'
import {AddDiscount, CreateOrderBySeller} from './components/formFunctions'
import {setGstBillInSellerCart} from '../../../store/actions/seller'
import {storage, StorageKeys} from '../../../utils/storage'
import {CreateOrderHeader, CreateOrderProducts} from './components/CreateOrder'
import type {Payment} from '../../../services/typing/userService'

export const CreateSellerOrder: React.FC = () => {
  const {cart} = useSelector(state => state.seller)
  const dispatch = useDispatch()
  const {qty, price} = calculateTotalQtyAndPriceFromOrder(cart.products)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGstBillInSellerCart(!event.target.checked))
  }

  useEffect(() => {
    storage.setItem(StorageKeys.SELLER_CART, cart)
  }, [cart])

  const priceAfterDiscount = price - (cart.discount.amount ?? 0)

  const payment: Payment = {
    grandTotal: priceAfterDiscount * (cart.gstBill ? 1.18 : 1),
    id: 0,
    mode: 'CASH',
    status: 'CREATED',
    amount: price,
    gst: priceAfterDiscount * (cart.gstBill ? 0.18 : 0),
    discountCoupon: cart.discount
  }

  return (
    <Stack spacing={2}>
      <CreateOrderHeader />
      <CreateOrderProducts />
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'end'}>
        <ModalForms getFormDetails={CreateOrderBySeller}>
          <Button variant={'contained'} size={'large'} disabled={!cart.billingAddress || cart.products.isEmpty()}>
            Collect payment and create order
          </Button>
        </ModalForms>
        <Stack direction={'row'} justifyContent={'end'} spacing={8}>
          <Stack>
            <FormControlLabel
              label={'Without GST'}
              control={<Checkbox onChange={handleChange} checked={!cart.gstBill} />}
            />
          </Stack>
          <Stack alignItems={'end'}>
            <PriceSummary qty={qty} payment={payment} />
            <ModalForms getFormDetails={AddDiscount}>
              <ButtonAsLink>Add discount</ButtonAsLink>
            </ModalForms>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

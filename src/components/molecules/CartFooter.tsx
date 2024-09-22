import type {ProductDetails} from '../templates/products/Product'
import {Stack, Typography} from '@mui/material'
import React, {useEffect} from 'react'
import {calculateTotalQtyAndPrice} from '../../utils/utils'
import {useDispatch, useSelector} from '../../hooks'
import '../../utils/extenstions'
import {Config} from '../../config'
import {Button, ButtonAsLink, Link, PriceSummary} from '../atoms'
import {ModalForms} from '../organisms'
import {ApplyCoupon} from '../organisms/ModalForms'
import {updateShippingPrice} from '../../store/actions'
import type {Payment, Shipping} from '../../services/typing/userService'

type CartProductPropsType = {
  products: ProductDetails[]
  type: 'checkout' | 'cart'
  onSuccess?: () => void
}

export const CartFooter: React.FC<CartProductPropsType> = ({products, type, onSuccess}) => {
  const {cart} = useSelector(state => state)
  const dispatch = useDispatch()
  const {qty, price} = calculateTotalQtyAndPrice(cart, products)

  const isShippingChargeApplicable =
    cart.type === 'ONLINE' && cart.shippingAddress !== null && price < Config.FREE_DELIVERY_THRESHOLD_VALUE

  useEffect(() => {
    dispatch(updateShippingPrice(isShippingChargeApplicable ? Config.SHIPPING_CHARGE : 0))
  }, [cart.type, cart.shippingAddress, price])

  const discountCoupon = cart.discountCoupon
    ? {
        ...cart.discountCoupon,
        amount: (cart.discountCoupon.discount * price) / 100
      }
    : null
  const gst = (price - (discountCoupon?.amount ?? 0)) * 0.18
  const payment: Payment = {
    amount: price,
    grandTotal: price - (discountCoupon?.amount ?? 0) + gst + cart.shippingCharge,
    gst,
    id: 0,
    mode: 'RAZORPAY',
    status: 'CREATED',
    discountCoupon
  }

  const shipping: Shipping | undefined = cart.shippingAddress
    ? {
        address: cart.shippingAddress,
        charge: cart.shippingCharge
      }
    : undefined

  if (products.isEmpty()) {
    return (
      <Stack height={120} alignItems={'center'} justifyContent={'center'}>
        <Typography variant={'h6'} color={'error'}>
          Your cart is empty!!
        </Typography>
      </Stack>
    )
  }

  return (
    <Stack spacing={2}>
      <PriceSummary qty={qty} payment={payment} shipping={shipping} />
      <Stack direction={'row'} justifyContent={'flex-end'} spacing={2} alignItems={'center'}>
        <ModalForms getFormDetails={ApplyCoupon}>
          <ButtonAsLink>Apply coupon</ButtonAsLink>
        </ModalForms>
        {type === 'cart' ? (
          <Button variant={'contained'} component={Link} href={Config.CHECKOUT_PAGE_PATH}>
            Proceed to checkout
          </Button>
        ) : (
          <Button variant={'contained'} onClick={onSuccess} color={'warning'}>
            Place order
          </Button>
        )}
      </Stack>
    </Stack>
  )
}

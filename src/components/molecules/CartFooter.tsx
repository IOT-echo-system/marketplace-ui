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
    cart.type === 'ONLINE' &&
    cart.shippingAddress !== null &&
    price < +(process.env.NEXT_PUBLIC_FREE_DELIVERY_THRESHOLD ?? 2000)

  useEffect(() => {
    dispatch(updateShippingPrice(isShippingChargeApplicable ? 99 : 0))
  }, [cart.type, cart.shippingAddress, price])

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
      <PriceSummary
        qty={qty}
        discountCoupon={cart.discountCoupon}
        amount={price}
        shippingCharge={cart.shippingCharge}
        shippingRequired={cart.type === 'ONLINE' && cart.shippingAddress !== null}
      />
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

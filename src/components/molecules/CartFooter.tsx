import type {ProductDetails} from '../templates/products/Product'
import {Stack, Typography} from '@mui/material'
import React, {useEffect} from 'react'
import {calculateTotalQtyAndPrice} from '../../utils/utils'
import {useDispatch, useSelector} from '../../hooks'
import '../../utils/extenstions'
import {Config} from '../../config'
import {Button, ButtonAsLink, Link, PriceSummary} from '../atoms'
import {updateShippingPrice} from '../../store/actions'
import {ModalForms} from '../organisms'
import {ApplyCoupon} from '../organisms/ModalForms/formFunctions'

type CartProductPropsType = {
  products: ProductDetails[]
  type: 'checkout' | 'cart'
  onSuccess?: () => void
}

export const CartFooter: React.FC<CartProductPropsType> = ({products, type, onSuccess}) => {
  const dispatch = useDispatch()
  const {cart} = useSelector(state => state)
  const {qty, price} = calculateTotalQtyAndPrice(cart, products)

  useEffect(() => {
    dispatch(updateShippingPrice(price <= 0 || price >= 2000 ? 0 : 99))
  }, [price])

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

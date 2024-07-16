import type {ProductDetails} from '../templates/products/Product'
import {Stack, Typography} from '@mui/material'
import React from 'react'
import {calculateTotalQtyAndPrice, formatPrice} from '../../utils/utils'
import {useMedia, useSelector} from '../../hooks'
import '../../utils/extenstions'
import {Config} from '../../config'
import {Button, Link} from '../atoms'

type CartProductPropsType = {
  products: ProductDetails[]
  type: 'checkout' | 'cart'
  onSuccess?: () => void
}

export const CartFooter: React.FC<CartProductPropsType> = ({products, type, onSuccess}) => {
  const media = useMedia()
  const {cart} = useSelector(state => state)
  const {qty, price} = calculateTotalQtyAndPrice(cart, products)

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
    <>
      <Stack direction={'row'} flexWrap={'wrap'} justifyContent={'flex-end'}>
        <Typography variant={media.sm ? 'subtitle1' : 'h6'}>
          Subtotal ({qty} items): {formatPrice(price)}
        </Typography>
      </Stack>
      <Stack direction={'row'} justifyContent={'flex-end'}>
        {type === 'checkout' ? (
          <Button color={'warning'} variant={'contained'} onClick={onSuccess}>
            Place order
          </Button>
        ) : (
          <Button variant={'contained'} component={Link} href={Config.CHECKOUT_PAGE_PATH}>
            Proceed to checkout
          </Button>
        )}
      </Stack>
    </>
  )
}

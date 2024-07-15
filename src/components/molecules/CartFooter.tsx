import type {ProductDetails} from '../templates/products/Product'
import {Stack, Typography} from '@mui/material'
import React from 'react'
import {formatPrice} from '../../utils/utils'
import {useMedia, useSelector} from '../../hooks'
import '../../utils/extenstions'
import {useRouter} from 'next/router'
import {storage, StorageKeys} from '../../utils/storage'
import {Config} from '../../config'
import {Button} from '../atoms'

type CartProductPropsType = {
  products: ProductDetails[]
  type: 'checkout' | 'cart'
  onSuccess?: () => void
}
export const CartFooter: React.FC<CartProductPropsType> = ({products, type, onSuccess}) => {
  const media = useMedia()
  const router = useRouter()
  const {cart} = useSelector(state => state)

  const handleCheckout = () => {
    storage.setItem(StorageKeys.CART, cart.productIds)
    router.push(Config.CHECKOUT_PAGE_PATH).catch()
  }

  const handlePlaceOrder = () => {
    onSuccess && onSuccess()
  }

  const {qty, price} = cart.productIds.reduce(
    (count, {qty, productId}) => {
      const price = products.find(product => product.productId === productId)?.price ?? 0
      return {qty: count.qty + qty, price: count.price + qty * price}
    },
    {price: 0, qty: 0}
  )

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
          <Button color={'warning'} variant={'contained'} onClick={handlePlaceOrder}>
            Place order
          </Button>
        ) : (
          <Button variant={'contained'} onClick={handleCheckout}>
            Proceed to checkout
          </Button>
        )}
      </Stack>
    </>
  )
}

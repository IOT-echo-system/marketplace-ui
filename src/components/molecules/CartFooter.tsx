import type {ProductDetails} from '../templates/products/Product'
import {Stack, Typography} from '@mui/material'
import React from 'react'
import {formatNumber} from '../../utils/utils'
import {useDispatch, useMedia, useSelector} from '../../hooks'
import '../../utils/extenstions'
import {useRouter} from 'next/router'
import {storage, StorageKeys} from '../../utils/storage'
import {Config} from '../../config'
import {Button} from '../atoms'
import {addProducts} from '../../store/actions/cart'
import type {OrderProduct} from '../../store/reducers/cart'
import {createOrderProduct} from '../../store/reducers/cart'

type CartProductPropsType = {products: ProductDetails[]; type: 'checkout' | 'cart'; onSuccess?: () => void}
export const CartFooter: React.FC<CartProductPropsType> = ({products, type, onSuccess}) => {
  const media = useMedia()
  const dispatch = useDispatch()
  const router = useRouter()
  const {productIds} = useSelector(state => state.cart)

  const handleCheckout = () => {
    storage.setItem(StorageKeys.CART, productIds)
    router.push(Config.CHECKOUT_PAGE_PATH).catch()
  }

  const handlePlaceOrder = () => {
    const productsWithQty = productIds
      .reduce<OrderProduct[]>((orderProducts, {productId, qty}) => {
        const product = products.find(product => product.productId === productId)
        return product ? orderProducts.concat(createOrderProduct(product, qty)) : orderProducts
      }, [])
      .filter(product => Boolean(product))
    dispatch(addProducts(productsWithQty))
    // UserService.placeOrder()
    onSuccess && onSuccess()
  }

  const {qty, price} = productIds.reduce(
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
          Subtotal ({qty} items): ₹{formatNumber(price)}
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

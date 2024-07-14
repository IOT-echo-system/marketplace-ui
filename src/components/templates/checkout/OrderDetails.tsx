import React, {useEffect, useState} from 'react'
import {Stack} from '@mui/material'
import type {CheckoutStatePropsType} from './Checkout'
import {useMedia, useSelector} from '../../../hooks'
import {CartFooter, CartProduct} from '../../molecules'
import type {ProductDetails} from '../products/Product'
import {CMSService} from '../../../services'

export const OrderDetails: React.FC<CheckoutStatePropsType> = ({onSuccess}) => {
  const media = useMedia()
  const {productIds} = useSelector(state => state.cart)
  const [products, setProducts] = useState<ProductDetails[]>([])

  useEffect(() => {
    CMSService.getCartProducts(productIds.map(item => item.productId))
      .then(setProducts)
      .catch()
  }, [productIds])

  return (
    <Stack justifyContent={'space-around'} spacing={media.md ? 2 : 4}>
      <Stack>
        {products.map(product => (
          <CartProduct key={product.productId} product={product} />
        ))}
      </Stack>
      <CartFooter onSuccess={onSuccess} type={'checkout'} products={products} />
    </Stack>
  )
}

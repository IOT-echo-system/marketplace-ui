import React from 'react'
import {Stack} from '@mui/material'
import {useMedia} from '../../../hooks'
import {CartFooter, CartProduct} from '../../molecules'
import type {ProductDetails} from '../products/Product'
import type {CheckoutStatePropsType} from './Checkout'

type OrderDetailsPropsType = CheckoutStatePropsType & {products: ProductDetails[]}
export const OrderDetails: React.FC<OrderDetailsPropsType> = ({onSuccess, products}) => {
  const media = useMedia()

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

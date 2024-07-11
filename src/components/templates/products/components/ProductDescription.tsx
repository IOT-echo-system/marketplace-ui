import type {ProductDetails as ProductDetailsType} from '../Product'
import React from 'react'
import {Stack} from '@mui/material'
import {RTE} from '../../../molecules'

export const ProductDescription: React.FC<{product: ProductDetailsType}> = ({product}) => {
  return (
    <Stack spacing={4}>
      <RTE rte={product.description} />
    </Stack>
  )
}

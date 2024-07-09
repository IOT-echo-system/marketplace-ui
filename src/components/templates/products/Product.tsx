import React from 'react'
import {BoxedContainer, ImageType} from '../../atoms'
import {ProductDescription, ProductDetails, ProductImageWithThumbnails} from './components'
import {Divider, Stack} from '@mui/material'
import {useMedia} from '../../../hooks'

export type ProductDetails = {
  title: string
  slug: string
  price: number
  availableQty: number
  productId: string
  images: ImageType[]
  description: string
  additionalDetails: string
}

export const Product: React.FC<{product: ProductDetails}> = ({product}) => {
  const media = useMedia()
  return (
    <BoxedContainer pt={4} spacing={media.lg ? 2 : 4}>
      <Stack direction={media.md ? 'column' : 'row'} spacing={media.lg ? 4 : 8} alignItems={media.md ? 'center' : 'start'}>
        <Stack width={media.lg ? '100%' : `50%`}>
          <ProductImageWithThumbnails product={product} />
        </Stack>
        <Stack width={media.lg ? '100%' : `50%`}>
          <ProductDetails product={product} />
        </Stack>
      </Stack>
      <Divider />
      <Stack>
        <ProductDescription product={product} />
      </Stack>
    </BoxedContainer>
  )
}

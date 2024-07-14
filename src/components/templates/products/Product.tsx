import React from 'react'
import type {ImageType} from '../../atoms'
import {AddToCartButton, BoxedContainer} from '../../atoms'
import {ProductDetails, ProductImageWithThumbnails} from './components'
import {Button, Stack} from '@mui/material'
import {useMedia} from '../../../hooks'
import {FlashOn} from '@mui/icons-material'

export type ProductDetails = {
  title: string
  slug: string
  price: number
  mrp: number
  availableQty: number
  productId: string
  images: ImageType[]
  featuredImage?: ImageType
  description: string
  shortDescription: string
  additionalDetails: string
  categories: {data: Array<{attributes: {name: string; link: string}}>}
  tags: {data: Array<{attributes: {name: string; link: string}}>}
}

// eslint-disable-next-line complexity
export const Product: React.FC<{product: ProductDetails}> = ({product}) => {
  const media = useMedia()

  return (
    <Stack mt={2} mb={2}>
      <BoxedContainer
        p={media.lg ? 2 : 4}
        spacing={media.xl ? 4 : 8}
        bgcolor={'background.paper'}
        direction={media.md ? 'column' : 'row'}
        alignItems={media.md ? 'center' : 'start'}
      >
        <Stack width={media.lg ? '100%' : '40%'} spacing={2} sx={{position: 'sticky', zIndex: 1, top: 0}}>
          <ProductImageWithThumbnails product={product} />
          <Stack spacing={media.sm ? 1 : 2} direction={media.sm ? 'column' : 'row'}>
            <AddToCartButton productId={product.productId} />
            <Button
              sx={{textTransform: 'inherit'}}
              variant={'contained'}
              startIcon={<FlashOn />}
              fullWidth
              size={media.xl ? 'small' : 'large'}
              color={'primary'}
            >
              Buy now
            </Button>
          </Stack>
        </Stack>
        <Stack width={media.lg ? '100%' : '60%'}>
          <ProductDetails product={product} />
        </Stack>
      </BoxedContainer>
    </Stack>
  )
}

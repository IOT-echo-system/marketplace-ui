import React from 'react'
import type {ImageType} from '../../atoms'
import {AddToCartButton, BoxedContainer, Button} from '../../atoms'
import {ProductDetails, ProductImageWithThumbnails} from './components'
import {Stack} from '@mui/material'
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

export const Product: React.FC<{product: ProductDetails}> = ({product}) => {
  return (
    <Stack mt={2} mb={2}>
      <BoxedContainer
        p={{xs: 2, lg: 4}}
        spacing={{xs: 4, xl: 8}}
        bgcolor={'background.paper'}
        direction={{md: 'row'}}
        alignItems={{xs: 'center', md: 'start'}}
      >
        <Stack width={{xs: '100%', md: '40%'}} spacing={2} sx={{position: 'sticky', zIndex: 1, top: 0}}>
          <ProductImageWithThumbnails product={product} />
          <Stack spacing={{xs: 1, sm: 2}} direction={{sm: 'row'}}>
            <AddToCartButton productId={product.productId} />
            <Button variant={'contained'} startIcon={<FlashOn />} fullWidth color={'primary'}>
              Buy now
            </Button>
          </Stack>
        </Stack>
        <Stack width={{xs: '100%', md: '60%'}}>
          <ProductDetails product={product} />
        </Stack>
      </BoxedContainer>
    </Stack>
  )
}

import React from 'react'
import type {ImageType} from '../../atoms'
import {BoxedContainer} from '../../atoms'
import {ProductDetails, ProductImageWithThumbnails} from './components'
import type {StackProps} from '@mui/material'
import {Button, Stack, styled} from '@mui/material'
import {useMedia} from '../../../hooks'
import {FlashOn, ShoppingCart} from '@mui/icons-material'

const ActionContainer = styled(Stack)<StackProps>(({theme}) => ({
  [theme.breakpoints.down('md')]: {}
}))

export type ProductDetails = {
  title: string
  slug: string
  price: number
  availableQty: number
  productId: string
  images: ImageType[]
  description: string
  additionalDetails: string,
  categories: { data: Array<{ attributes: { name: string, link: string } }> },
  tags: { data: Array<{ attributes: { name: string, link: string } }> },
}

export const Product: React.FC<{ product: ProductDetails }> = ({product}) => {
  const media = useMedia()

  return (
    <Stack mt={2} mb={2}>
      <BoxedContainer p={media.lg ? 2 : 4} spacing={media.xl ? 4 : 8} bgcolor={'background.paper'}
                      direction={media.md ? 'column' : 'row'}
                      alignItems={media.md ? 'center' : 'start'}>
        <Stack width={media.lg ? '100%' : '40%'} spacing={2} sx={{position: 'sticky', zIndex: 1, top: 0}}>
          <ProductImageWithThumbnails product={product}/>
          <ActionContainer spacing={media.sm ? 1 : 2} direction={media.sm ? 'column' : 'row'}>
            <Button variant={'contained'} startIcon={<ShoppingCart/>} fullWidth
                    size={media.xl ? 'small' : 'large'}
                    color={'warning'}>
              Add to cart
            </Button>
            <Button variant={'contained'} startIcon={<FlashOn/>} fullWidth
                    size={media.xl ? 'small' : 'large'}
                    color={'primary'}>
              Buy now
            </Button>
          </ActionContainer>
        </Stack>
        <Stack width={media.lg ? '100%' : '60%'}>
          <ProductDetails product={product}/>
        </Stack>
      </BoxedContainer>
    </Stack>
  )
}

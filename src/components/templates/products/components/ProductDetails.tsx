import type {ProductDetails as ProductDetailsType} from '../Product'
import React from 'react'
import {Stack, Typography} from '@mui/material'
import {Breadcrumb, RTE} from '../../../molecules'

export const ProductDetails: React.FC<{ product: ProductDetailsType }> = ({product}) => {
  return (
    <Stack spacing={2}>
      <Breadcrumb
        links={product.categories.data.map(({attributes}) => ({link: attributes.link, label: attributes.name}))}/>
      <Typography variant={'h5'} component={'h1'}>
        {product.title}
      </Typography>
      <Stack>
        <Stack direction={'row'}>
          <Typography variant={'body2'}>Product code: </Typography>
          <Typography variant={'body2'}>&nbsp;{product.productId}</Typography>
        </Stack>
        <Stack direction={'row'}>
          <Typography>Availability: </Typography>
          <Typography sx={{color: product.availableQty > 0 ? 'success.main' : 'error.main'}}>
            &nbsp;{product.availableQty > 0 ? `In stocks (${product.availableQty} items)` : 'Out of stocks'}
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        <Typography sx={{color: 'success.main'}}>Special price</Typography>
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <Typography variant={'h5'} component={'div'}>
            ₹{product.price.toFixed(2)}
          </Typography>
          <Typography sx={{color: 'grey'}}>
            <s>₹{(product.price + (product.price * 0.18)).toFixed(2)}</s>
          </Typography>
          <Typography sx={{color: 'success.main'}}>
            18% off
          </Typography>
        </Stack>
        <Typography variant={'caption'}>(Excluding 18% GST)</Typography>
      </Stack>
      <Stack>
        <Typography variant={'h5'} component={'h2'}>Description</Typography>
        <RTE rte={product.description}/>
      </Stack>
      <Stack>
        <Typography variant={'h5'} component={'h2'}>Additional details</Typography>
        <RTE rte={product.additionalDetails}/>
      </Stack>
    </Stack>
  )
}

import type {ProductDetails as ProductDetailsType} from '../Product'
import React from 'react'
import {Stack, Typography} from '@mui/material'
import {Breadcrumb, RTE} from '../../../molecules'
import {Price} from '../../../atoms'

export const ProductDetails: React.FC<{product: ProductDetailsType}> = ({product}) => {
  return (
    <Stack spacing={2}>
      <Breadcrumb
        links={product.categories.data.map(({attributes}) => ({
          link: `/categories/${attributes.link}`,
          label: attributes.name
        }))}
      />
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
        <Price price={product.price} mrp={product.price * 1.18} />
        <Typography variant={'caption'}>(Excluding 18% GST)</Typography>
      </Stack>
      <Stack>
        <Typography variant={'h5'} component={'h2'}>
          Description
        </Typography>
        <RTE text={product.description} />
      </Stack>
      <Stack>
        <Typography variant={'h5'} component={'h2'}>
          Additional details
        </Typography>
        <RTE text={product.additionalDetails} />
      </Stack>
    </Stack>
  )
}

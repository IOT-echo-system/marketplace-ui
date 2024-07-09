import {ProductDetails as ProductDetailsType} from '../Product'
import React, {useEffect, useState} from 'react'
import {IconButton, Stack, TextField, Typography} from '@mui/material'
import theme from '../../../../theme/theme'
import {Button} from '../../../atoms'
import {AddCircle, RemoveCircle} from '@mui/icons-material'
import {useMedia} from '../../../../hooks'

export const ProductDetails: React.FC<{product: ProductDetailsType}> = ({product}) => {
  const [qty, setQty] = useState(1)
  const media = useMedia()

  useEffect(() => {
    if (qty < 0) {
      setQty(0)
    }
    if (qty > product.availableQty) {
      setQty(product.availableQty)
    }
  }, [qty])

  return (
    <Stack spacing={media.lg ? 2 : 4}>
      <Typography variant={media.lg ? 'h5' : 'h4'} component={'h1'}>
        {product.title}
      </Typography>
      <Stack spacing={media.lg ? 0 : 1}>
        <Stack direction={'row'}>
          <Typography variant={'body2'}>Product code: </Typography>
          <Typography variant={'body2'}>&nbsp;{product.productId}</Typography>
        </Stack>
        <Stack direction={'row'}>
          <Typography>Availability: </Typography>
          <Typography sx={{color: product.availableQty > 0 ? theme.palette.success.main : theme.palette.error.main}}>
            &nbsp;{product.availableQty > 0 ? `In stocks (${product.availableQty} items)` : 'Out of stocks'}
          </Typography>
        </Stack>
      </Stack>
      <Stack spacing={media.lg ? 0 : 1}>
        <Typography>
          <s>Rs. {(product.price + product.price * 0.2).toFixed(2)}</s>
        </Typography>
        <Stack>
          <Typography variant={'h5'} component={'div'}>
            Rs. {product.price.toFixed(2)}
          </Typography>
          <Typography>(Excluding 18% GST)</Typography>
        </Stack>
      </Stack>
      <Stack spacing={media.md ? 1 : 4} direction={media.sm ? 'column' : 'row'}
             alignItems={media.sm ? 'start' : 'center'}>
        <Typography variant={'h6'} component={'div'}>
          Qty:
        </Typography>
        <Stack direction={'row'} spacing={1}>
          <IconButton color={'error'} onClick={() => setQty(qty - 1)}>
            <RemoveCircle fontSize={'large'} />
          </IconButton>
          <Stack width={120} justifyContent={'center'} alignItems={'center'}>
            <TextField
              variant={'outlined'}
              type={'number'}
              size={'small'}
              value={qty === 0 ? '' : qty}
              onChange={event => setQty(+event.target.value)}
            />
          </Stack>
          <IconButton color={'success'} onClick={() => setQty(qty + 1)}>
            <AddCircle fontSize={'large'} />
          </IconButton>
        </Stack>
      </Stack>
      <Stack spacing={4} direction={'row'}>
        <Button variant={'contained'}>Add to cart</Button>
        <Button variant={'contained'}>Buy now</Button>
      </Stack>
    </Stack>
  )
}

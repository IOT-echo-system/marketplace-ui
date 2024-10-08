import React from 'react'
import {Stack, Typography} from '@mui/material'
import {formatPrice} from '../../utils/utils'

type PriceProps = {mrp: number; price: number; size?: 'small'}

export const Price: React.FC<PriceProps> = ({mrp, price, size}) => {
  const discount = Math.round(((mrp - price) * 100) / price)
  return (
    <Stack direction={'row'} spacing={size === 'small' ? 0.8 : 2} alignItems={'center'} flexWrap={'wrap'}>
      <Typography variant={size === 'small' ? 'h6' : 'h5'} component={'div'}>
        {formatPrice(price)}
      </Typography>
      <Typography sx={{color: 'grey'}}>
        <s>{formatPrice(mrp)}</s>
      </Typography>
      <Typography sx={{color: 'success.main'}}>{discount}% off</Typography>
    </Stack>
  )
}

import React from 'react'
import {Stack, Typography} from '@mui/material'
import type {Coupon} from '../../services/typing/userService'
import {formatPrice} from '../../utils/utils'
import '../../utils/extenstions'

type PriceSummaryPropsType = {
  qty: number
  discountCoupon: Coupon | null
  amount: number
  shippingCharge: number
  shippingRequired?: boolean
}

export const PriceSummary: React.FC<PriceSummaryPropsType> = ({
  qty,
  discountCoupon,
  amount,
  shippingCharge,
  shippingRequired
}) => {
  const discount = (amount * (discountCoupon?.discount ?? 0)) / 100
  const amountWithGST = (amount - discount) * 1.18
  return (
    <Stack justifyContent={'flex-end'} alignItems={'flex-end'} spacing={1}>
      <Typography variant={'subtitle1'}>
        Subtotal ({qty} items): {formatPrice(amount)}
      </Typography>
      {discountCoupon?.discount.isGreaterThanZero() && (
        <Typography>
          Discount ({discountCoupon.discount}%): {formatPrice(-discount)}
        </Typography>
      )}
      <Typography>GST (18%): {formatPrice((amount - discount) * 0.18)}</Typography>
      {shippingRequired && <Typography>Shipping charge: {formatPrice(shippingCharge)}</Typography>}
      <Typography fontWeight={'bold'} variant={'subtitle1'}>
        Grand total: {formatPrice(amountWithGST + shippingCharge)}
      </Typography>
    </Stack>
  )
}

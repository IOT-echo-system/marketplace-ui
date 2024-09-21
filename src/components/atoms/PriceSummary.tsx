import React from 'react'
import {Stack, Typography} from '@mui/material'
import {formatPrice} from '../../utils/utils'
import '../../utils/extenstions'
import type {Payment, Shipping} from '../../services/typing/userService'

type PriceSummaryPropsType = {
  qty: number
  payment: Payment
  shipping?: Shipping
}

export const PriceSummary: React.FC<PriceSummaryPropsType> = props => {
  const {qty, payment, shipping} = props

  return (
    <Stack justifyContent={'flex-end'} alignItems={'flex-end'} spacing={1}>
      <Typography variant={'subtitle1'}>
        Subtotal ({qty} items): {formatPrice(payment.amount)}
      </Typography>
      {payment.discountCoupon && (
        <Typography>Discount: {formatPrice(-(payment.discountCoupon.amount ?? 0))}</Typography>
      )}
      {payment.gst.isGreaterThanZero() && <Typography>GST (18%): {formatPrice(payment.gst)}</Typography>}
      {shipping && <Typography>Shipping charge: {formatPrice(shipping.charge)}</Typography>}
      <Typography fontWeight={'bold'} variant={'subtitle1'}>
        Grand total: {formatPrice(payment.grandTotal)}
      </Typography>
    </Stack>
  )
}

import React from 'react'
import {Stack, Typography} from '@mui/material'
import type {Coupon} from '../../services/typing/userService'
import {formatPrice} from '../../utils/utils'
import '../../utils/extenstions'

type PriceSummaryPropsType = {
  qty: number
  discountCoupon?: Coupon | null
  amount: number
  shippingCharge: number
  shippingRequired?: boolean
  withoutGST?: boolean,
  amountPaid?: number
}

export const PriceSummary: React.FC<PriceSummaryPropsType> = props => {
  const {qty, discountCoupon, amount, shippingCharge, shippingRequired, withoutGST} = props
  const isSellerDiscount = discountCoupon?.code === 'SELLER'
  const discount = isSellerDiscount ? discountCoupon.discount : (amount * (discountCoupon?.discount ?? 0)) / 100
  const amountWithGST = (amount - discount) * (withoutGST ? 1 : 1.18)
  const grandTotalAmount = amountWithGST + shippingCharge
  return (
    <Stack justifyContent={'flex-end'} alignItems={'flex-end'} spacing={1}>
      <Typography variant={'subtitle1'}>
        Subtotal ({qty} items): {formatPrice(amount)}
      </Typography>
      {discountCoupon?.discount.isGreaterThanZero() && (
        <Typography>
          Discount {isSellerDiscount ? '' : `(${discountCoupon.discount}%)`}: {formatPrice(-discount)}
        </Typography>
      )}
      {!withoutGST && <Typography>GST (18%): {formatPrice((amount - discount) * 0.18)}</Typography>}
      {shippingRequired && <Typography>Shipping charge: {formatPrice(shippingCharge)}</Typography>}
      <Typography fontWeight={'bold'} variant={'subtitle1'}>
        Grand total: {formatPrice(grandTotalAmount)}
      </Typography>
      {props.amountPaid && <Typography fontWeight={'bold'} variant={'subtitle1'}>
        Amount paid: {formatPrice(props.amountPaid)}
      </Typography>}
    </Stack>
  )
}

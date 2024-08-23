import React, {useEffect, useState} from 'react'
import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material'
import {useToast} from '../../../hooks'
import type {Order as OrderType} from '../../../services/typing/userService'
import {SellerService} from '../../../services'
import {Address, Button, Link, Loader, PriceSummary} from '../../atoms'
import {calculateTotalQtyAndPriceFromOrder, formatPrice} from '../../../utils/utils'
import theme from '../../../theme/theme'
import {Config} from '../../../config'

export const OnlineOrder: React.FC<{orderId: string}> = ({orderId}) => {
  const [order, setOrder] = useState<OrderType | null>(null)
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    setLoading(true)
    SellerService.getOrder(orderId)
      .then(setOrder)
      .catch((error: Error) => {
        toast.error(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Loader text={'Loading...'} height={200} />
  }

  if (!order) {
    return (
      <Stack>
        <Typography>Order not found</Typography>
      </Stack>
    )
  }
  const {price, qty} = calculateTotalQtyAndPriceFromOrder(order.products)

  return (
    <Stack spacing={2}>
      <Stack direction={{xs: 'column', md: 'row'}} spacing={2} justifyContent={{md: 'space-between'}}>
        <Address address={order.shippingAddress} title={'Shipping address'} />
        <Address address={order.billingAddress} title={'Billing address'} />
      </Stack>
      <TableContainer sx={{border: `1px solid ${theme.palette.divider}`}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell sx={{textAlign: 'right'}}>Qty</TableCell>
              <TableCell sx={{textAlign: 'right'}}>Price / unit</TableCell>
              <TableCell sx={{textAlign: 'right'}}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.products.map((orderProduct, index) => {
              return (
                <TableRow key={orderProduct.productId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Link href={`${Config.PRODUCT_PAGE_PATH}/${orderProduct.slug}`}>{orderProduct.title}</Link>
                  </TableCell>
                  <TableCell sx={{textAlign: 'right'}}>{orderProduct.qty}</TableCell>
                  <TableCell sx={{textAlign: 'right'}}>{formatPrice(orderProduct.price)}</TableCell>
                  <TableCell sx={{textAlign: 'right'}}>{formatPrice(orderProduct.price * orderProduct.qty)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        spacing={2}
        direction={{xs: 'column-reverse', sm: 'row'}}
        justifyContent={'space-between'}
        alignItems={'flex-end'}
      >
        <Button variant={'outlined'} component={Link} href={`${Config.ORDERS_PAGE_PATH}/${order.id}/track`}>
          Mark as Packed
        </Button>
        <PriceSummary
          qty={qty}
          discountCoupon={order.discountCoupon}
          amount={price}
          shippingCharge={order.shippingCharge}
          shippingRequired
        />
      </Stack>
    </Stack>
  )
}
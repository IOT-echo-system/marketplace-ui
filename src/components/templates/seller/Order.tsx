import React from 'react'
import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import type {SellerOrder} from '../../../services/typing/userService'
import {Address, Link, PriceSummary} from '../../atoms'
import {formatPrice} from '../../../utils/utils'
import theme from '../../../theme/theme'
import {Config} from '../../../config'
import {OrderStateAction} from './components/OrderStateAction'

export const Order: React.FC<{order: SellerOrder}> = ({order}) => {
  return (
    <Stack spacing={2}>
      <Stack direction={{xs: 'column', md: 'row'}} spacing={2} justifyContent={{md: 'space-between'}}>
        {order.shipping && <Address address={order.shipping.address} title={'Shipping address'} />}
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
        <OrderStateAction order={order} />
        <PriceSummary qty={order.qty} payment={order.payment} shipping={order.shipping} />
      </Stack>
    </Stack>
  )
}

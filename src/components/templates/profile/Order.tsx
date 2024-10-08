import React from 'react'
import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import type {Order as OrderType} from '../../../services/typing/userService'
import {Address, Link, PriceSummary} from '../../atoms'
import {useMedia} from '../../../hooks'
import theme from '../../../theme/theme'
import {formatPrice} from '../../../utils/utils'
import {Config} from '../../../config'
import {OrderStatus} from './components/OrderStatus'

export const Order: React.FC<{order: OrderType}> = ({order}) => {
  const media = useMedia()

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
              {!media.tablet && <TableCell>S.No</TableCell>}
              <TableCell>Name</TableCell>
              <TableCell sx={{textAlign: 'right'}}>Qty</TableCell>
              {!media.tablet && <TableCell sx={{textAlign: 'right'}}>Price / unit</TableCell>}
              <TableCell sx={{textAlign: 'right'}}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.products.map((orderProduct, index) => {
              return (
                <TableRow key={orderProduct.productId}>
                  {!media.tablet && <TableCell>{index + 1}</TableCell>}
                  <TableCell>
                    <Link href={`${Config.PRODUCT_PAGE_PATH}/${orderProduct.slug}`}>{orderProduct.title}</Link>
                  </TableCell>
                  <TableCell sx={{textAlign: 'right'}}>{orderProduct.qty}</TableCell>
                  {!media.tablet && <TableCell sx={{textAlign: 'right'}}>{formatPrice(orderProduct.price)}</TableCell>}
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
        <OrderStatus order={order} />
        <PriceSummary qty={order.qty} shipping={order.shipping} payment={order.payment} />
      </Stack>
    </Stack>
  )
}

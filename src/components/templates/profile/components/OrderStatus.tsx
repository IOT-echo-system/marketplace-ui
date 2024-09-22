import type {Order} from '../../../../services/typing/userService'
import {Button, Link, Stack} from '../../../atoms'
import {Config} from '../../../../config'
import React from 'react'
import {Chip} from '@mui/material'

const storePickupLabels: Record<Order['state'], string> = {
  DELIVERED: 'Delivered',
  ORDER_NOT_PLACED: 'Order not placed',
  PLACED: 'Ready for pickup'
}

export const OrderStatus: React.FC<{order: Order}> = ({order}) => {
  if (order.type === 'STORE_PICKUP') {
    return (
      <Stack direction={'row'} rowspacing={1} spacing={2} flexWrap={'wrap'}>
        <Chip label={storePickupLabels[order.state]} />
        <Chip label={order.payment.mode} />
        <Chip label={`Payment: ${order.payment.status}`} />
      </Stack>
    )
  }

  return (
    <Button variant={'outlined'} component={Link} href={`${Config.ORDERS_PAGE_PATH}/${order.id}/track`}>
      Track order
    </Button>
  )
}

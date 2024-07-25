import React, {useEffect, useState} from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import {UserService} from '../../../services'
import type {Order} from '../../../services/typing/userService'
import {calculateTotalQtyAndPriceFromOrder, formatDate, formatPrice} from '../../../utils/utils'
import theme from '../../../theme/theme'
import {Link} from '../../atoms'
import {Config} from '../../../config'

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    UserService.getOrders().then(setOrders).catch()
  }, [])

  return (
    <TableContainer sx={{border: `1px solid ${theme.palette.divider}`}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order id</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Order status</TableCell>
            <TableCell>Created on</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(order => {
            const {qty} = calculateTotalQtyAndPriceFromOrder(order.products)
            return (
              <TableRow key={order.id}>
                <TableCell>
                  <Link href={`${Config.ORDERS_PAGE_PATH}/${order.id}`}>{order.id}</Link>
                </TableCell>
                <TableCell>{qty}</TableCell>
                <TableCell>{formatPrice(order.amount)}</TableCell>
                <TableCell>{order.state}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

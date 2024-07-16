import React, {useEffect, useState} from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import {UserService} from '../../../services'
import type {Order} from '../../../services/typing/authService'
import {calculateTotalQtyAndPriceFromOrder, formatDate} from '../../../utils/utils'
import theme from '../../../theme/theme'

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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(order => {
            const {qty, price} = calculateTotalQtyAndPriceFromOrder(order.products)
            return (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{qty}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell>{order.state}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{order.state}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

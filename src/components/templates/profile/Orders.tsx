import React, {useEffect, useState} from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme} from '@mui/material'
import {UserService} from '../../../services'
import type {Order} from '../../../services/typing/userService'
import {calculateTotalQtyAndPriceFromOrder, formatDate, formatPrice} from '../../../utils/utils'
import {Link, Stack} from '../../atoms'
import {Config} from '../../../config'
import {useMedia} from '../../../hooks'

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const media = useMedia()
  const theme = useTheme()

  useEffect(() => {
    UserService.getOrders().then(setOrders).catch()
  }, [])

  if (media.sm) {
    return (
      <TableContainer sx={{border: `1px solid ${theme.palette.divider}`}}>
        <Table>
          <TableBody>
            {orders.map(order => {
              const {qty} = calculateTotalQtyAndPriceFromOrder(order.products)
              return (
                <TableRow key={order.id}>
                  <TableCell>
                    <Stack direction={'row'} flexWrap={'wrap'} spacing={6}>
                      <Typography>
                        OrderId: <Link href={`${Config.ORDERS_PAGE_PATH}/${order.id}`}>{order.id}</Link>
                      </Typography>
                      <Typography ml={4}>Qty.: {qty}</Typography>
                      <Typography>Amount: {formatPrice(order.amount)}</Typography>
                      <Typography>Order state: {order.state.replace(/_/g, ' ')}</Typography>
                      <Typography>Created on: {formatDate(order.createdAt)}</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

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
                <TableCell>{order.state.replace(/_/g, ' ')}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

import React from 'react'
import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from '@mui/material'
import {formatDate, formatPrice} from '../../../utils/utils'
import theme from '../../../theme/theme'
import {Form, Link, Pagination} from '../../atoms'
import {Config} from '../../../config'
import {useOnlineOrdersFilterAndSort} from './components/OnlineOrderFilter/useOnlineOrdersFilter'

export const OnlineOrders: React.FC = () => {
  const {form, orders, sort, handleChangeSort, pagination, handlePageChange} = useOnlineOrdersFilterAndSort()

  return (
    <Stack spacing={2}>
      <Form
        handleSubmit={form.handleSubmit}
        inputFields={form.inputFields}
        submitBtnText={form.submitBtnText}
        direction={'row'}
      />
      <TableContainer sx={{border: `1px solid ${theme.palette.divider}`}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel active={sort.sortBy === 'id'} onClick={handleChangeSort('id')} direction={sort.order}>
                  Order id
                </TableSortLabel>
              </TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sort.sortBy === 'state'}
                  onClick={handleChangeSort('state')}
                  direction={sort.order}
                >
                  Order Status
                </TableSortLabel>
              </TableCell>
              <TableCell>Created on</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => {
              return (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link href={`${Config.SELLER_ONLINE_ORDERS_PAGE_PATH}/${order.id}`}>{order.id}</Link>
                  </TableCell>
                  <TableCell>{order.qty}</TableCell>
                  <TableCell>{formatPrice(order.amount)}</TableCell>
                  <TableCell>{order.state}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <Stack p={2}>
            <Pagination pagination={pagination} handlePageChange={handlePageChange} />
          </Stack>
        </Table>
      </TableContainer>
    </Stack>
  )
}

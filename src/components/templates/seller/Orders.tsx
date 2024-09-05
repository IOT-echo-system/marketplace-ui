import React from 'react'
import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from '@mui/material'
import {formatDate, formatPrice} from '../../../utils/utils'
import theme from '../../../theme/theme'
import {Button, Form, Link, Pagination} from '../../atoms'
import {Config} from '../../../config'
import {useOrdersFilterAndSort} from './components/OrderFilter/useOrdersFilter'
import {Add} from '@mui/icons-material'

export const Orders: React.FC = () => {
  const {form, orders, sort, handleChangeSort, pagination, handlePageChange} = useOrdersFilterAndSort()

  return (
    <Stack spacing={2}>
      <Stack direction={'row'}>
        <Button variant={'contained'} startIcon={<Add />} component={Link} href={Config.SELLER_ORDERS_CREATE_PAGE_PATH}>
          Create order
        </Button>
      </Stack>
      <Form direction={'row'} {...form} />
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
              <TableCell>
                <TableSortLabel
                  active={sort.sortBy === 'type'}
                  onClick={handleChangeSort('type')}
                  direction={sort.order}
                >
                  Order type
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
                    <Link href={`${Config.SELLER_ORDERS_PAGE_PATH}/${order.id}`}>{order.id}</Link>
                  </TableCell>
                  <TableCell>{order.qty}</TableCell>
                  <TableCell>{formatPrice(order.amount)}</TableCell>
                  <TableCell>{order.state}</TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          {pagination.pageCount.isGreaterThan(1) && (
            <Stack p={2}>
              <Pagination pagination={pagination} handlePageChange={handlePageChange} />
            </Stack>
          )}
        </Table>
      </TableContainer>
    </Stack>
  )
}

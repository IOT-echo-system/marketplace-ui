import React from 'react'
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  useTheme
} from '@mui/material'
import {ModalForms} from '../../../../organisms'
import {AddProductIntoCart} from '../formFunctions'
import {useSelector} from '../../../../../hooks'
import {Link} from '../../../../atoms'
import {Config} from '../../../../../config'
import {formatPrice} from '../../../../../utils/utils'
import {Delete, Edit} from '@mui/icons-material'

export const CreateOrderProducts: React.FC = () => {
  const cart = useSelector(state => state.seller.cart)
  const theme = useTheme()

  return (
    <TableContainer sx={{border: `1px solid ${theme.palette.divider}`}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell sx={{textAlign: 'right'}}>Qty</TableCell>
            <TableCell sx={{textAlign: 'right'}}>Price / unit</TableCell>
            <TableCell sx={{textAlign: 'right'}}>Price</TableCell>
            <TableCell sx={{textAlign: 'right'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.products.map((orderProduct, index) => {
            return (
              <TableRow key={orderProduct.productId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Link href={`${Config.PRODUCT_PAGE_PATH}/${orderProduct.slug}`}>{orderProduct.title}</Link>
                </TableCell>
                <TableCell sx={{textAlign: 'right'}}>{orderProduct.qty}</TableCell>
                <TableCell sx={{textAlign: 'right'}}>{formatPrice(orderProduct.price)}</TableCell>
                <TableCell
                  sx={{textAlign: 'right'}}>{formatPrice(orderProduct.price * orderProduct.qty)}</TableCell>
                <TableCell sx={{textAlign: 'right'}}>
                  <Stack direction={'row'} justifyContent={'flex-end'} spacing={1}>
                    <ModalForms getFormDetails={AddProductIntoCart} product={orderProduct} type={'EDIT'}>
                      <IconButton color={'success'}>
                        <Tooltip title={'Edit'}>
                          <Edit/>
                        </Tooltip>
                      </IconButton>
                    </ModalForms>
                    <IconButton color={'error'}>
                      <Tooltip title={'Delete'}>
                        <Delete/>
                      </Tooltip>
                    </IconButton>
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

import React, {useEffect} from 'react'
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'
import theme from '../../../theme/theme'
import {Button, ButtonAsLink, Link, PriceSummary} from '../../atoms'
import {useDispatch, useSelector} from '../../../hooks'
import {ModalForms} from '../../organisms'
import {Add, Delete, Edit} from '@mui/icons-material'
import {Config} from '../../../config'
import {calculateTotalQtyAndPriceFromOrder, formatPrice} from '../../../utils/utils'
import {AddDiscount, AddProductIntoCart, AddSellerAddress, CollectPayment} from './components/formFunctions'
import {setGstBillInSellerCart} from '../../../store/actions/seller'
import {storage, StorageKeys} from '../../../utils/storage'

export const CreateSellerOrder: React.FC = () => {
  const {cart} = useSelector(state => state.seller)
  const dispatch = useDispatch()
  const {qty, price} = calculateTotalQtyAndPriceFromOrder(cart.products)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGstBillInSellerCart(!event.target.checked))
  }

  useEffect(() => {
    storage.setItem(StorageKeys.SELLER_CART, cart)
  }, [cart])

  return (
    <Stack spacing={2}>
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
                  <TableCell sx={{textAlign: 'right'}}>{formatPrice(orderProduct.price * orderProduct.qty)}</TableCell>
                  <TableCell sx={{textAlign: 'right'}}>
                    <Stack direction={'row'} justifyContent={'flex-end'} spacing={1}>
                      <ModalForms getFormDetails={AddProductIntoCart} product={orderProduct} type={'EDIT'}>
                        <IconButton color={'success'}>
                          <Tooltip title={'Edit'}>
                            <Edit />
                          </Tooltip>
                        </IconButton>
                      </ModalForms>
                      <IconButton color={'error'}>
                        <Tooltip title={'Delete'}>
                          <Delete />
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
      <Stack direction={'row'} justifyContent={'space-between'}>
        <ModalForms getFormDetails={AddProductIntoCart} type={'ADD'}>
          <Button startIcon={<Add />} variant={'contained'} size={'large'}>
            Add item
          </Button>
        </ModalForms>
        <Stack>
          <FormControlLabel
            label={'Without GST'}
            control={<Checkbox onChange={handleChange} checked={!cart.gstBill} />}
          />
        </Stack>
        <Stack alignItems={'end'}>
          <PriceSummary
            withoutGST={!cart.gstBill}
            qty={qty}
            amount={price}
            shippingCharge={0}
            discountCoupon={cart.discount}
            shippingRequired={false}
          />
          <ModalForms getFormDetails={AddDiscount}>
            <ButtonAsLink>Add discount</ButtonAsLink>
          </ModalForms>
        </Stack>
      </Stack>
      <Stack direction={'row'} justifyContent={'end'} spacing={4}>
        <ModalForms getFormDetails={AddSellerAddress}>
          <Button variant={'contained'} color={'warning'} size={'large'}>
            Add billing address
          </Button>
        </ModalForms>
        <ModalForms getFormDetails={CollectPayment}>
          <Button variant={'contained'} size={'large'} disabled={!cart.billingAddress}>
            Make payment
          </Button>
        </ModalForms>
      </Stack>
    </Stack>
  )
}

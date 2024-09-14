import React from 'react'
import type {SellerOrder} from '../../../../services/typing/userService'
import {ModalForms} from '../../../organisms'
import {Button} from '../../../atoms'
import {Chip, Stack} from '@mui/material'
import {ConfirmationModal, CreateShipmentOrder, markAsDeliveredBySeller} from '../../../organisms/ModalForms'
import {CollectPayment} from './formFunctions'
import {SellerService} from '../../../../services'
import {useDispatch, useToast} from '../../../../hooks'
import {updateOthersItem} from '../../../../store/actions'

export const OrderStateAction: React.FC<{ order: SellerOrder }> = ({order}) => {
  const dispatch = useDispatch()
  const toast = useToast()
  const handleClick = () => {
    SellerService.updatePaymentStatus(order.id)
      .then(order => {
        dispatch(updateOthersItem('sellerOrder', order))
      })
      .catch(toast.error)
  }

  if (order.type === 'STORE_PICKUP' && order.state === 'PLACED') {
    return (
      <Stack direction={'row'} spacing={2}>
        {order.payment.mode === 'RAZORPAY' &&
          <ConfirmationModal getConfirmationModalDetails={markAsDeliveredBySeller} orderId={order.id}>
            <Button variant={'outlined'}>Mark as Delivered</Button>
          </ConfirmationModal>}
        {order.payment.mode === 'CASH' &&
          <ModalForms getFormDetails={CollectPayment} order={order}>
            <Button variant={'outlined'}>Collect payment and deliver</Button>
          </ModalForms>}
        <Chip label={order.payment.mode}/>
        <Chip label={`Payment: ${order.payment.status}`}/>
        {order.payment.status === 'CREATED' && order.payment.mode === 'RAZORPAY' &&
          <Button variant={'contained'} onClick={handleClick}>Reload payment</Button>}
      </Stack>
    )
  }

  if (order.state === 'DELIVERED') {
    return <Stack direction={'row'} spacing={2}>
      <Chip label={'Delivered'} color={'success'}/>
      <Chip label={order.payment.mode}/>
      <Chip label={`Payment: ${order.payment.status}`}/>
    </Stack>
  }
  return (
    <Stack direction={'row'} spacing={2}>
      {order.state === 'PLACED' && (
        <ModalForms getFormDetails={CreateShipmentOrder} order={order}>
          <Button variant={'outlined'}>Mark as Packed</Button>
        </ModalForms>
      )}
      {order.state === 'ORDER_NOT_PLACED' && <Chip label={'Order not placed'} color={'error'}/>}
    </Stack>
  )
}

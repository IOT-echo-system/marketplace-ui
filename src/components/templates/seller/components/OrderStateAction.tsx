import React from 'react'
import type {Order} from '../../../../services/typing/userService'
import {ModalForms} from '../../../organisms'
import {Button} from '../../../atoms'
import {Chip} from '@mui/material'
import {ConfirmationModal, CreateShipmentOrder, markAsDeliveredBySeller} from '../../../organisms/ModalForms'

export const OrderStateAction: React.FC<{order: Order}> = ({order}) => {
  if (order.type === 'STORE_PICKUP' && order.state === 'PLACED') {
    return (
      <ConfirmationModal getConfirmationModalDetails={markAsDeliveredBySeller} orderId={order.id}>
        <Button variant={'outlined'}>Mark as Delivered</Button>
      </ConfirmationModal>
    )
  }

  if (order.state === 'DELIVERED') {
    return <Chip label={'Delivered'} color={'success'} />
  }
  return (
    <>
      {order.state === 'PLACED' && (
        <ModalForms getFormDetails={CreateShipmentOrder} order={order}>
          <Button variant={'outlined'}>Mark as Packed</Button>
        </ModalForms>
      )}
      {order.state === 'ORDER_NOT_PLACED' && <Chip label={'Order not placed'} color={'error'} />}
      {/*{order.state !== 'ORDER_NOT_PLACED' && order.state !== 'PLACED' &&*/}
      {/*  <Chip label={'Order not placed'} color={'error'}/>}*/}
    </>
  )
}

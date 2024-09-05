import type {GetConfirmationModalPropsTypeFunction} from '../ConfirmationModal'
import {useToast} from '../../../../hooks'
import {useState} from 'react'
import {SellerService} from '../../../../services'

export const markAsDeliveredBySeller: GetConfirmationModalPropsTypeFunction<{
  orderId: number
}> = (handleClose, {orderId}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const onConfirm = () => {
    setLoading(true)
    SellerService.markAsDelivered(orderId)
      .then(() => {
        // dispatch(updateWidget(widget, widget.boardId))
        handleClose()
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }
  return {
    title: 'Are you sure to mark as Delivered?',
    onConfirm,
    onCancel: handleClose,
    loading
  }
}

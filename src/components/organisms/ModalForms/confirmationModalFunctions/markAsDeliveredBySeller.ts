import type {GetConfirmationModalPropsTypeFunction} from '../ConfirmationModal'
import {useDispatch, useToast} from '../../../../hooks'
import {useState} from 'react'
import {SellerService} from '../../../../services'
import {updateOthersItem} from '../../../../store/actions'

export const markAsDeliveredBySeller: GetConfirmationModalPropsTypeFunction<{
  orderId: number
}> = (handleClose, {orderId}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()

  const onConfirm = () => {
    setLoading(true)
    SellerService.markAsDelivered(orderId)
      .then((order) => {
        dispatch(updateOthersItem('sellerOrder', order))
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

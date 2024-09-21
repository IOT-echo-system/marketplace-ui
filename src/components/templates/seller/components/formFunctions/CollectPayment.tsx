import type {GetFormPropsTypeFunction} from '../../../../organisms/ModalForms/model'
import type {FormInputType} from '../../../../atoms'
import {useDispatch, useForm, useToast} from '../../../../../hooks'
import type {PaymentMode} from '../../../../../store/reducers/seller'
import {useState} from 'react'
import type {SellerOrder} from '../../../../../services/typing/userService'
import {SellerService} from '../../../../../services'
import {updateOthersItem} from '../../../../../store/actions'

export const CollectPayment: GetFormPropsTypeFunction<{order: SellerOrder}> = (handleClose, {order}) => {
  const [loading, setLoading] = useState(false)
  const {values, onClear, onChange, handleSubmit} = useForm<{mode: PaymentMode; amount: number}>({
    mode: 'CASH',
    amount: order.amount
  })
  const dispatch = useDispatch()
  const toast = useToast()

  const cashInputField: FormInputType = {
    inputType: 'textField',
    type: 'number',
    value: values.amount,
    label: 'Collected amount',
    required: true,
    onChange: event => {
      onChange('amount', +event.target.value)
    },
    size: 'small'
  }

  const inputFields: FormInputType[] = [
    {
      inputType: 'radioField',
      value: values.mode,
      options: [
        {value: 'CASH', label: 'Cash'},
        {value: 'RAZORPAY', label: 'Cards/UPI/NetBanking (Razorpay)'}
      ],
      handleChange: value => {
        onChange('mode', value as PaymentMode)
      }
    },
    ...(values.mode === 'CASH' ? [cashInputField] : [])
  ]

  const onSubmit = () => {
    setLoading(true)
    SellerService.collectPaymentAndMarkDelivered(order.id, values)
      .then(order => {
        dispatch(updateOthersItem('sellerOrder', order))
        onClear()
        handleClose()
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    inputFields,
    title: 'Collect payment',
    submitBtnText: 'Collect payment',
    handleSubmit: handleSubmit(onSubmit),
    loading
  }
}

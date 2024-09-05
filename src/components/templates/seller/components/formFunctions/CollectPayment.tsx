import type {GetFormPropsTypeFunction} from '../../../../organisms/ModalForms/model'
import type {FormInputType} from '../../../../atoms'
import {useDispatch, useForm, useSelector} from '../../../../../hooks'
import {updatePaymentModeInSellerCart} from '../../../../../store/actions/seller'
import type {PaymentMode} from '../../../../../store/reducers/seller'
import {useState} from 'react'
import {SellerService} from '../../../../../services'

export const CollectPayment: GetFormPropsTypeFunction = handleClose => {
  const [loading, setLoading] = useState(false)
  const {values, onClear, onChange, handleSubmit} = useForm<{mode: PaymentMode}>({mode: 'CASH'})
  const dispatch = useDispatch()
  const {cart} = useSelector(state => state.seller)

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
    }
  ]

  const onSubmit = () => {
    // setLoading(true)
    dispatch(updatePaymentModeInSellerCart(values.mode))
    onClear()
    SellerService.addOrder(cart)
  }

  return {
    inputFields,
    title: 'Collect payment',
    submitBtnText: 'Collect payment',
    handleSubmit: handleSubmit(onSubmit),
    loading
  }
}

import type {GetFormPropsTypeFunction} from '../../../../organisms/ModalForms/model'
import type {FormInputType} from '../../../../atoms'
import {useForm, useSelector, useToast} from '../../../../../hooks'
import type {PaymentMode} from '../../../../../store/reducers/seller'
import {useState} from 'react'
import {SellerService} from '../../../../../services'
import {useRouter} from 'next/router'
import {Config} from '../../../../../config'

export const CreateOrderBySeller: GetFormPropsTypeFunction = handleClose => {
  const [loading, setLoading] = useState(false)
  const cart = useSelector(state => state.seller.cart)
  const router = useRouter()

  const {values, onClear, onChange, handleSubmit} = useForm<{mode: PaymentMode}>({mode: 'CASH'})
  const toast = useToast()

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
    setLoading(true)
    SellerService.createSellerOrder(cart, values)
      .then(order => {
        onClear()
        handleClose()
        return router.push(`${Config.SELLER_ORDERS_PAGE_PATH}/${order.id}`)
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

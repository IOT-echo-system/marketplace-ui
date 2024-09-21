import type {GetFormPropsTypeFunction} from '../../../../organisms/ModalForms/model'
import {useDispatch, useForm} from '../../../../../hooks'
import type {FormInputType} from '../../../../atoms'
import {setDiscountInSellerCart} from '../../../../../store/actions/seller'
import type {Coupon} from '../../../../../services/typing/userService'

export const AddDiscount: GetFormPropsTypeFunction = handleClose => {
  const dispatch = useDispatch()
  const {values, onClear, handleSubmit, onChange} = useForm<Coupon>({discount: 0, code: 'SELLER', amount: 0})

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      type: 'number',
      label: 'Discount',
      value: values.amount?.toString(),
      required: true,
      size: 'small',
      onChange: event => {
        onChange('amount', +event.target.value)
      }
    }
  ]

  const onSubmit = () => {
    dispatch(setDiscountInSellerCart(values))
    onClear()
    handleClose()
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    loading: false,
    inputFields: formInputs,
    title: 'Add discount',
    submitBtnText: 'Add discount'
  }
}

import {useState} from 'react'
import {useDispatch, useForm, useToast} from '../../../../hooks'
import type {FormInputType} from '../../../atoms'
import type {GetFormPropsTypeFunction} from '../model'
import {UserService} from '../../../../services'
import {updateDiscount} from '../../../../store/actions'

export const ApplyCoupon: GetFormPropsTypeFunction = handleClose => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const dispatch = useDispatch()
  const {values, onClear, handleSubmit, onChange} = useForm({code: ''})

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Coupon',
      value: values.code,
      required: true,
      size: 'small',
      onChange: event => {
        onChange('code', event.target.value)
      }
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    UserService.applyCoupon(values)
      .then(coupon => {
        dispatch(updateDiscount(coupon))
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
      .finally(() => {
        setLoading(false)
        onClear()
        handleClose()
      })
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    loading,
    inputFields: formInputs,
    title: 'Apply coupon',
    submitBtnText: 'Apply',
    submitBtnDisabled: values.code === ''
  }
}

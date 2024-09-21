import {useState} from 'react'
import {useForm, useToast} from '../../../../hooks'
import type {FormInputType} from '../../../atoms'
import type {GetFormPropsTypeFunction} from '../model'
import type {Order} from '../../../../services/typing/userService'
import {ShippingService} from '../../../../services/ShippingService'

export const CreateShipmentOrder: GetFormPropsTypeFunction<{order: Order}> = (handleClose, {order}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  // const dispatch = useDispatch()
  const {values, onClear, handleSubmit, onChange} = useForm({length: 10, width: 10, height: 5, weight: 0.5})

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      type: 'number',
      label: 'Shipment length (in cm)',
      value: values.length,
      required: true,
      size: 'small',
      onChange: event => {
        onChange('length', +event.target.value)
      }
    },
    {
      inputType: 'textField',
      type: 'number',
      label: 'Shipment width (in cm)',
      value: values.width,
      required: true,
      size: 'small',
      onChange: event => {
        onChange('width', +event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'Shipment height (in cm)',
      type: 'number',
      value: values.height,
      required: true,
      size: 'small',
      onChange: event => {
        onChange('height', +event.target.value)
      }
    },
    {
      inputType: 'textField',
      type: 'number',
      label: 'Shipment weight (in Kg)',
      value: values.weight,
      size: 'small',
      onChange: event => {
        onChange('weight', +event.target.value)
      }
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    ShippingService.createOrder({...values, orderId: order.id})
      .then(() => {
        // dispatch(setAddresses([...addresses, address]))
        onClear()
        handleClose()
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    loading,
    inputFields: formInputs,
    title: 'Create shipment',
    submitBtnText: 'Create shipment'
  }
}

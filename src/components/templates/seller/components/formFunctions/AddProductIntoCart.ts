import type {GetFormPropsTypeFunction} from '../../../../organisms/ModalForms/model'
import type {OrderProduct} from '../../../../../store/reducers/seller'
import {useDispatch, useForm} from '../../../../../hooks'
import type {FormInputType} from '../../../../atoms'
import {addItemInSellerCart} from '../../../../../store/actions/seller'

export const AddProductIntoCart: GetFormPropsTypeFunction<
  | {type: 'ADD'}
  | {
      type: 'EDIT'
      product: OrderProduct
    }
> = (handleClose, props) => {
  const dispatch = useDispatch()
  const {values, onClear, handleSubmit, onChange} = useForm<OrderProduct>(
    props.type === 'EDIT'
      ? props.product
      : {
        mrp: 0,
        price: 0,
        productId: '',
        qty: 1,
        slug: '',
        title: ''
      }
  )

  // useEffect(() => {
  //   if (isValidPin && values.pinCode > 0) {
  //     CMSService.getAddressByPinCode(values.pinCode)
  //       .then(address => {
  //         onChange('city', address.city)
  //         onChange('state', address.state)
  //         onChange('district', address.district)
  //       })
  //       .catch(() => {
  //         onChange('city', '')
  //         onChange('state', '')
  //         onChange('district', '')
  //         toast.error('Something went wrong, please check your pin code')
  //       })
  //   }
  // }, [isValidPin])

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Id',
      value: values.productId,
      required: true,
      size: 'small',
      onChange: event => {
        onChange('productId', event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'Name',
      value: values.title,
      required: true,
      size: 'small',
      onChange: event => {
        onChange('title', event.target.value)
      }
    },
    {
      inputType: 'textField',
      type: 'number',
      label: 'Qty',
      value: values.qty ? values.qty : '',
      required: true,
      size: 'small',
      onChange: event => {
        onChange('qty', +event.target.value)
      }
    },
    {
      inputType: 'textField',
      type: 'number',
      label: 'Price / unit',
      value: values.price ? values.price : '',
      required: true,
      size: 'small',
      onChange: event => {
        onChange('price', +event.target.value)
      }
    }
  ]

  const onSubmit = () => {
    dispatch(addItemInSellerCart(values))
    onClear()
    props.type === 'EDIT' && handleClose()
  }

  const capitalize = props.type.toString().capitalize()
  return {
    handleSubmit: handleSubmit(onSubmit),
    loading: false,
    inputFields: formInputs,
    title: `${capitalize} product`,
    submitBtnText: `${capitalize} product`
  }
}

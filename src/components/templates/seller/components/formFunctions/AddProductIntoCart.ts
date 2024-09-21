import type {GetFormPropsTypeFunction} from '../../../../organisms/ModalForms/model'
import type {OrderProduct} from '../../../../../store/reducers/seller'
import {useDispatch, useForm} from '../../../../../hooks'
import type {FormInputType, FormSelectOption} from '../../../../atoms'
import {addItemInSellerCart} from '../../../../../store/actions/seller'
import {useEffect, useState} from 'react'
import {SellerService} from '../../../../../services'

type AddProductIntoCartType = {type: 'ADD'} | {type: 'EDIT'; product: OrderProduct}
export const AddProductIntoCart: GetFormPropsTypeFunction<AddProductIntoCartType> = (handleClose, props) => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState<FormSelectOption[]>([])
  const [products, setProducts] = useState<OrderProduct[]>([])
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

  useEffect(() => {
    const allOptions = products.map(orderProduct => ({
      label: `${orderProduct.productId}; ${orderProduct.title}; Price: ${orderProduct.price}`,
      value: orderProduct.productId
    }))
    allOptions.push({label: values.title, value: values.title})
    setOptions(allOptions)
  }, [products])

  useEffect(() => {
    if (values.title) {
      SellerService.getProductsByIdOrName(values.title).then(setProducts).catch()
    }
  }, [values.title])

  const formInputs: FormInputType[] = [
    {
      inputType: 'selectField',
      label: 'Name',
      value: values.title,
      options: options,
      required: true,
      size: 'small',
      placeholder: 'Enter product name or id',
      onChange: event => {
        onChange('title', event.target.value)
      },
      handleChange: (productId: string): void => {
        const product = products.find(product => product.productId === productId)
        if (product) {
          onChange('title', product.title)
          onChange('productId', product.productId)
          onChange('slug', product.slug)
          onChange('price', product.price)
        } else {
          onChange('title', productId)
          const randomProductId = `svn-${Math.floor(Math.random() * (50000 - 40000 + 1)) + 40000}`
          onChange('productId', randomProductId)
          onChange('slug', randomProductId)
        }
      }
    },
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

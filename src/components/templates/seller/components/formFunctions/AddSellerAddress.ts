import {useEffect, useState} from 'react'
import type {GetFormPropsTypeFunction} from '../../../../organisms/ModalForms/model'
import {useDispatch, useForm, useToast} from '../../../../../hooks'
import {CMSService, SellerService} from '../../../../../services'
import type {FormInputType} from '../../../../atoms'
import {addAddressInSellerCart} from '../../../../../store/actions/seller'
import type {AddressType} from '../../../../../store/reducers'

export const AddSellerAddress: GetFormPropsTypeFunction = handleClose => {
  const [isValidMobile, setIsValidMobile] = useState(true)
  const [isValidPin, setIsValidPin] = useState(true)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const dispatch = useDispatch()
  const {values, onClear, handleSubmit, onChange} = useForm<AddressType>({
    name: '',
    address1: '',
    address2: '',
    address3: '',
    city: '',
    district: '',
    state: '',
    pinCode: 0,
    mobileNo: 0
  })

  useEffect(() => {
    const isValidMobile = values.mobileNo === 0 || values.mobileNo.isValidMobile()
    const isValidPin = values.pinCode === 0 || values.pinCode.isValidPinCode()
    setIsValidMobile(isValidMobile)
    setIsValidPin(isValidPin)
  }, [values.pinCode, values.mobileNo])

  useEffect(() => {
    if (values.mobileNo.isValidMobile()) {
      SellerService.getAddress(values.mobileNo)
        .then(address => {
          onChange('name', address.name)
          onChange('address1', address.address1)
          onChange('address2', address.address2)
          onChange('address3', address.address3)
          onChange('pinCode', address.pinCode)
        })
        .catch(() => {
          onChange('name', '')
          onChange('address1', '')
          onChange('address2', '')
          onChange('address3', '')
          onChange('pinCode', 0)
          toast.error('Address not found!!')
        })
    }
  }, [values.mobileNo])

  useEffect(() => {
    if (values.pinCode.isValidPinCode()) {
      CMSService.getAddressByPinCode(values.pinCode)
        .then(address => {
          onChange('city', address.city)
          onChange('state', address.state)
          onChange('district', address.district)
        })
        .catch(() => {
          onChange('city', '')
          onChange('state', '')
          onChange('district', '')
          toast.error('Something went wrong, please check your pin code')
        })
    }
  }, [values.pinCode])

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      type: 'number',
      label: 'Mobile no',
      value: values.mobileNo === 0 ? '' : values.mobileNo,
      required: true,
      size: 'small',
      onChange: event => {
        onChange('mobileNo', +event.target.value)
      },
      error: !isValidMobile,
      helperText: !isValidMobile ? 'Enter a valid mobile no.' : ''
    },
    {
      inputType: 'textField',
      label: 'Full name',
      value: values.name,
      required: true,
      size: 'small',
      onChange: event => {
        onChange('name', event.target.value)
      }
    },
    {
      inputType: 'textField',
      type: 'number',
      label: 'Pin code',
      value: values.pinCode === 0 ? '' : values.pinCode,
      required: true,
      size: 'small',
      onChange: event => {
        onChange('pinCode', +event.target.value)
      },
      error: !isValidPin,
      helperText: !isValidPin ? 'Enter a valid pin code.' : ''
    },
    {
      inputType: 'textField',
      label: 'Address 1',
      value: values.address1,
      required: true,
      size: 'small',
      onChange: event => {
        onChange('address1', event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'Address 2',
      value: values.address2,
      size: 'small',
      onChange: event => {
        onChange('address2', event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'Address 3',
      value: values.address3,
      size: 'small',
      onChange: event => {
        onChange('address3', event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'City',
      value: values.city,
      required: true,
      size: 'small',
      disabled: true
    },
    {
      inputType: 'textField',
      label: 'District',
      value: values.district,
      required: true,
      size: 'small',
      disabled: true
    },
    {
      inputType: 'textField',
      label: 'State',
      value: values.state,
      required: true,
      size: 'small',
      disabled: true
    }
  ]

  const onSubmit = (finalValues: AddressType) => {
    if (finalValues.city && finalValues.district && finalValues.state) {
      setLoading(true)
      SellerService.addAddress(finalValues)
        .then(address => {
          dispatch(addAddressInSellerCart(address))
          onClear()
          handleClose()
        })
        .catch(toast.error)
        .finally(() => {
          setLoading(false)
        })
    } else {
      toast.error('Invalid pincode, Please enter a valid pincode')
    }
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    loading,
    inputFields: formInputs,
    title: 'Add address',
    submitBtnText: 'Add address'
  }
}

import {useEffect, useState} from 'react'
import {useDispatch, useForm, useSelector, useToast} from '../../../../hooks'
import type {FormInputType} from '../../../atoms'
import type {GetFormPropsTypeFunction} from '../model'
import {CMSService, UserService} from '../../../../services'
import {setAddresses} from '../../../../store/actions'

export const AddAddress: GetFormPropsTypeFunction = handleClose => {
  const {addresses} = useSelector(state => state.address)
  const [loading, setLoading] = useState(false)
  const [isValidMobile, setIsValidMobile] = useState(true)
  const [isValidPin, setIsValidPin] = useState(true)
  const toast = useToast()

  const dispatch = useDispatch()
  const {values, onClear, handleSubmit, onChange} = useForm({
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
    const isValidMobile = values.mobileNo === 0 || (values.mobileNo >= 1000000000 && values.mobileNo <= 9999999999)
    const isValidPin = values.pinCode === 0 || (values.pinCode >= 100000 && values.pinCode <= 999999)
    setIsValidMobile(isValidMobile)
    setIsValidPin(isValidPin)
  }, [values.pinCode, values.mobileNo])

  useEffect(() => {
    if (isValidPin && values.pinCode > 0) {
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
  }, [isValidPin])

  const formInputs: FormInputType[] = [
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

  const onSubmit = () => {
    setLoading(true)
    UserService.addAddress(values)
      .then(address => {
        dispatch(setAddresses([...addresses, address]))
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
    title: 'Add new address',
    submitBtnText: 'Add address'
  }
}

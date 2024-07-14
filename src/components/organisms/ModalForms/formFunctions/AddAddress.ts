import {useEffect, useState} from 'react'
import {useDispatch, useForm, useSelector, useToast} from '../../../../hooks'
import type {FormInputType} from '../../../atoms'
import type {GetFormPropsTypeFunction} from '../model'
import type {IndianStateValue} from '../../../../data/stateList'
import {IndianStates} from '../../../../data/stateList'
import {UserService} from '../../../../services'
import {setAddresses} from '../../../../store/actions/address'

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
    state: '' as IndianStateValue,
    pinCode: 0,
    mobileNo: 0
  })

  useEffect(() => {
    const isValidMobile = values.mobileNo === 0 || (values.mobileNo >= 1000000000 && values.mobileNo <= 9999999999)
    const isValidPin = values.pinCode === 0 || (values.pinCode >= 100000 && values.pinCode <= 999999)
    setIsValidMobile(isValidMobile)
    setIsValidPin(isValidPin)
  }, [values.pinCode, values.mobileNo])

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
      onChange: event => {
        onChange('city', event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'District',
      value: values.district,
      required: true,
      size: 'small',
      onChange: event => {
        onChange('district', event.target.value)
      }
    },
    {
      inputType: 'selectField',
      options: IndianStates,
      label: 'State',
      value: values.state,
      required: true,
      size: 'small',
      handleChange: value => {
        onChange('state', value as IndianStateValue)
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
    formInputs,
    formTitle: 'Add new address',
    submitLabel: 'Add address'
  }
}

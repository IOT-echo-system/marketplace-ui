import type {FormInputType, FormPropsType} from '../../../../atoms'
import {useForm} from '../../../../../hooks'
import type {Order} from '../../../../../services/typing/userService'
import {useEffect, useState} from 'react'
import {SellerService} from '../../../../../services'
import type {MetaResponseType} from '../../../../../services/typing/CMSService'

type SortBy = 'id' | 'state' | 'type'
type SortOrder = 'asc' | 'desc'
type ReturnType = {
  form: FormPropsType
  orders: Order[]
  sort: { sortBy: SortBy; order: SortOrder }
  handleChangeSort: (by: SortBy) => () => void
  handlePageChange: (page: number) => void
} & MetaResponseType

export const useOrdersFilterAndSort = (): ReturnType => {
  const {values, onChange, handleSubmit} = useForm({filterBy: '', value: '', type: ''})
  const [orders, setOrders] = useState<Order[]>([])
  const [sortBy, setSortBy] = useState<SortBy>('id')
  const [order, setOrder] = useState<SortOrder>('desc')
  const [currentPage, setCurrentPage] = useState(0)
  const [pagination, setPagination] = useState<MetaResponseType['pagination']>({
    page: 0,
    pageCount: 0,
    pageSize: 0,
    total: 0
  })

  const handleChangeSort = (by: SortBy) => () => {
    if (sortBy === by) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(by)
    }
  }

  const getOrders = (finalValues: typeof values) => {
    SellerService.getOrders({sort: {sortBy, order}, filter: finalValues, page: currentPage})
      .then(({results, pagination}) => {
        setOrders(results)
        setPagination(pagination)
      })
      .catch()
  }

  const onSubmit = (finalValues: typeof values) => {
    setCurrentPage(1)
    getOrders(finalValues)
  }

  useEffect(() => {
    getOrders(values)
  }, [sortBy, order, currentPage])

  const OrderStatusOptions = [
    {label: 'Placed', value: 'PLACED'},
    {label: 'In transit', value: 'IN_TRANSIT'},
    {label: 'Order not placed', value: 'ORDER_NOT_PLACED'}
  ]

  const filterByState: FormInputType = {
    inputType: 'selectField',
    size: 'small',
    options: OrderStatusOptions,
    label: 'Order status',
    value: values.value,
    handleChange: option => {
      onChange('value', option as string)
    }
  }

  const filterById: FormInputType = {
    size: 'small',
    inputType: 'textField',
    label: 'Filter value',
    value: values.value,
    onChange: event => {
      onChange('value', event.target.value)
    },
    fullWidth: true
  }

  const inputFields: FormInputType[] = [
    {
      inputType: 'selectField',
      size: 'small',
      options: [
        {label: 'Online', value: 'ONLINE'},
        {label: 'Seller', value: 'SELLER'},
        {label: 'Store pickup', value: 'STORE_PICKUP'}
      ],
      label: 'Order type',
      value: values.type,
      handleChange: option => {
        onChange('type', option as string)
      }
    },
    {
      inputType: 'selectField',
      size: 'small',
      options: [
        {label: 'Order Id', value: 'id'},
        {label: 'Order status', value: 'state'}
      ],
      label: 'Filter by',
      value: values.filterBy,
      handleChange: option => {
        onChange('filterBy', option as string)
      }
    },
    values.filterBy === 'state' ? filterByState : filterById
  ]

  return {
    form: {inputFields, handleSubmit: handleSubmit(onSubmit), submitBtnText: 'Apply filter'},
    orders,
    sort: {sortBy, order},
    handleChangeSort,
    pagination,
    handlePageChange: setCurrentPage
  }
}

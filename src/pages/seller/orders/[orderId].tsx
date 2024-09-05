import type {GetServerSideProps, NextPage} from 'next'
import {Order, SellerWrapper} from '../../../components/templates/seller'
import {CMSService, SellerService} from '../../../services'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector, useToast} from '../../../hooks'
import {Loader} from '../../../components/atoms'
import {createOthersItem} from '../../../store/actions'

const OrderPage: NextPage = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const router = useRouter()
  const orderId = router.query.orderId as string
  const order = useSelector(state => state.others.order)

  useEffect(() => {
    setLoading(true)
    SellerService.getOrder(orderId)
      .then(order => {
        dispatch(createOthersItem('order', order))
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [orderId])

  if (loading) {
    return <Loader text={'Loading...'} height={200} />
  }

  const orderType = order?.type.replace('_', ' ').toLowerCase()
  return (
    <SellerWrapper title={`${orderType?.charAt(0).toUpperCase()}${orderType?.slice(1)}: ${orderId}`}>
      {order ? <Order order={order} /> : <></>}
    </SellerWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialValue = await CMSService.getInitialValue('background.default')
    return {props: {initialValue}}
  } catch (error) {
    return {props: {}}
  }
}

export default OrderPage

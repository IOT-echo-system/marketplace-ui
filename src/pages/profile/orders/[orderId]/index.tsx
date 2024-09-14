import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import React, {useEffect, useState} from 'react'
import {Order, ProfileWrapper} from '../../../../components/templates/profile'
import {CMSService, UserService} from '../../../../services'
import {useRouter} from 'next/router'
import {useDispatch, useSelector, useToast} from '../../../../hooks'
import {Loader} from '../../../../components/atoms'
import {Stack, Typography} from '@mui/material'
import {createOthersItem} from '../../../../store/actions'

const OrderPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const order = useSelector(state => state.others.order)

  useEffect(() => {
    setLoading(true)
    UserService.getOrder(router.query.orderId as string)
      .then(order => {
        dispatch(createOthersItem('order', order))
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Loader text={'Loading...'} height={200}/>
  }

  if (!order) {
    return (
      <Stack>
        <Typography>Order not found</Typography>
      </Stack>
    )
  }

  return (
    <ProfileWrapper title={`${order.type.capitalize().replace('_', ' ')} ${router.query.orderId as string}`}
                    requiredLoggedIn={true}>
      <Order order={order}/>
    </ProfileWrapper>
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

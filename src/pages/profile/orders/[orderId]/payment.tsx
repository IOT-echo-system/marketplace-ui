import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import React, {useEffect, useState} from 'react'
import {CMSService, SellerService} from '../../../../services'
import {useRouter} from 'next/router'
import {BoxedContainer, Loader} from '../../../../components/atoms'
import {Typography} from '@mui/material'

const OrderPaymentStatus: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<'SUCCESS' | 'FAILURE'>('FAILURE')

  useEffect(() => {
    SellerService.verifyPayment(+(router.query.orderId as string), router.query)
      .then(status => {
        setStatus(status)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <BoxedContainer p={4}>
      <BoxedContainer p={4} bgcolor={'background.paper'}>
        {loading
          ? <Loader text={'Loading'}/>
          : <Typography>
            Your payment is {status === 'SUCCESS' ? 'successful' : 'failed'} for
            order no. {router.query.orderId}
          </Typography>}
      </BoxedContainer>
    </BoxedContainer>
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

export default OrderPaymentStatus

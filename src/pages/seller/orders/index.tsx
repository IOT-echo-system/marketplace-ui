import type {GetServerSideProps, NextPage} from 'next'
import {Orders, SellerWrapper} from '../../../components/templates/seller'
import {CMSService} from '../../../services'

const OrdersPage: NextPage = () => {
  return (
    <SellerWrapper title={'Orders'}>
      <Orders />
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

export default OrdersPage

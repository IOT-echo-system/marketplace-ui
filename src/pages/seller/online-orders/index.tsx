import type {GetServerSideProps, NextPage} from 'next'
import {OnlineOrders, SellerWrapper} from '../../../components/templates/seller'
import {CMSService} from '../../../services'

const OnlineOrdersPage: NextPage = () => {
  return (
    <SellerWrapper title={'Online orders'}>
      <OnlineOrders />
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

export default OnlineOrdersPage

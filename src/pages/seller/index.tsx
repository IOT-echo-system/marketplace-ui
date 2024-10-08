import type {GetServerSideProps, NextPage} from 'next'
import {CMSService} from '../../services'
import {SellerDashboard, SellerWrapper} from '../../components/templates/seller'

const SellerPage: NextPage = () => {
  return (
    <SellerWrapper title={'Dashboard'}>
      <SellerDashboard />
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

export default SellerPage

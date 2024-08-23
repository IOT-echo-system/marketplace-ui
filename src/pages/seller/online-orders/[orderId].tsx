import type {GetServerSideProps, NextPage} from 'next'
import {OnlineOrder, SellerWrapper} from '../../../components/templates/seller'
import {CMSService} from '../../../services'
import {useRouter} from 'next/router'

const OnlineOrdersPage: NextPage = () => {
  const router = useRouter()
  const orderId = router.query.orderId as string
  return (
    <SellerWrapper title={`Online order: ${orderId}`}>
      <OnlineOrder orderId={orderId} />
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
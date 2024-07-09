import {type GetServerSideProps, NextPage} from 'next'
import {CMSService} from '../../services'

const ProductsPage: NextPage = () => {
  return <>Products</>
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialValue = await CMSService.getInitialValue()
    return {props: {initialValue}}
  } catch (error) {
    // const pageDetails: PageDetails = {ctaBanner: [], header: [], mainContent: [], seo: null, slug: ''}
    return {props: {}}
  }
}

export default ProductsPage

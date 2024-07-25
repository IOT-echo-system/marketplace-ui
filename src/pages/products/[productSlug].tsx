import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import {CMSService} from '../../services'
import type {ProductDetails} from '../../components/templates/products/Product'
import {Product} from '../../components/templates/products/Product'
import React from 'react'

const ProductPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({productDetails}) => {
  return <Product product={productDetails} />
}

export const getServerSideProps: GetServerSideProps<{productDetails: ProductDetails}> = async ctx => {
  try {
    const initialValue = await CMSService.getInitialValue('background.default')
    const productDetails = await CMSService.getProductDetails(ctx.query.productSlug as string)
    return {props: {initialValue, productDetails}}
  } catch (error) {
    return {notFound: true}
  }
}

export default ProductPage

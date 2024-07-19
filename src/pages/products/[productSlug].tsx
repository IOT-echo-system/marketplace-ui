import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import {CMSService} from '../../services'
import type {ProductDetails} from '../../components/templates/products/Product'
import {Product} from '../../components/templates/products/Product'
import React from 'react'
import {Stack} from '@mui/material'

const ProductPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({productDetails}) => {
  return (
    <Stack bgcolor={'background.default'}>
      <Product product={productDetails} />
    </Stack>
  )
}

export const getServerSideProps: GetServerSideProps<{productDetails: ProductDetails}> = async ctx => {
  try {
    const initialValue = await CMSService.getInitialValue()
    const productDetails = await CMSService.getProductDetails(ctx.query.productSlug as string)
    return {props: {initialValue, productDetails}}
  } catch (error) {
    return {notFound: true}
  }
}

export default ProductPage

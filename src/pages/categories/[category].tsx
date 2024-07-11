import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import React from 'react'
import type {ProductCatalogPropsType} from '../../components/templates/products/ProductCatalog'
import {ProductCatalog} from '../../components/templates/products/ProductCatalog'
import {CMSService} from '../../services'

const CategoryPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({products, category}) => {
  return <ProductCatalog products={products} category={category} />
}

export const getServerSideProps: GetServerSideProps<ProductCatalogPropsType> = async ({query}) => {
  try {
    const initialValue = await CMSService.getInitialValue()
    const products = await CMSService.getProductsByCategory(query.category as string, +(query.page ?? ('1' as string)))
    const category = await CMSService.getCategory(query.category as string)
    return {props: {initialValue, products, category}}
  } catch (error) {
    return {notFound: true}
  }
}

export default CategoryPage

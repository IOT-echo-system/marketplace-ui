import type {GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage} from 'next'
import {PageTemplate} from '../components/templates'
import {CMSService} from '../services'
import {Loader} from '../components/atoms'
import React from 'react'
import {useRouter} from 'next/router'
import type {PageDetailsType} from '../components/widgets'

export type PagePropsType = {pageDetails: PageDetailsType}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({pageDetails}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loader />
  }

  return <PageTemplate pageDetails={pageDetails} />
}

export const getStaticProps: GetStaticProps<PagePropsType> = async ({params}) => {
  try {
    const pageDetails = await CMSService.getPageContent(params?.page as string)
    const initialValue = await CMSService.getInitialValue()
    return {props: {pageDetails, initialValue}, revalidate: 84600}
  } catch (error) {
    return {notFound: true}
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const pageListResponse = await CMSService.getPageList()
    const pageList = pageListResponse.map(page => `/${page.slug}`)
    return {paths: pageList, fallback: true}
  } catch (error) {
    return {paths: [], fallback: true}
  }
}

export default Page

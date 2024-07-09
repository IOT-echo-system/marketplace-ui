import type {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next'
import {CMSService} from '../services'

const ErrorPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  return <>404 not found!</>
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const initialValue = await CMSService.getInitialValue()
    return {props: {initialValue}, revalidate: 84600}
  } catch (error) {
    return {props: {}, revalidate: 120}
  }
}

export default ErrorPage

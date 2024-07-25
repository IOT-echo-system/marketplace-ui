import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import {CMSService} from '../services'
import type {PagePropsType} from './[page]'
import Page from './[page]'
import type {PageDetailsType} from '../components/widgets'

const HomePage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({pageDetails}) => {
  return <Page pageDetails={pageDetails}/>
}

export const getServerSideProps: GetServerSideProps<PagePropsType> = async () => {
  const initialValue = await CMSService.getInitialValue()
  try {
    const pageDetails = await CMSService.getPageContent('index').catch()
    return {props: {pageDetails, initialValue}}
  } catch (error) {
    const pageDetails: PageDetailsType = {name: '', slug: '', ctaBanner: [], header: [], content: [], carousel: []}
    return {props: {pageDetails, initialValue}}
  }
}

export default HomePage

import React from 'react'
import type {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next'
import {ContactUs} from '../components/templates'
import type {LocationPropsType} from '../components/molecules'
import {Location} from '../components/molecules'
import {BoxedContainer} from '../components/atoms'
import {Stack} from '@mui/material'
import {CMSService} from '../services'
import type {AddressType} from '../store/reducers'

type ContactUsPagePropsType = LocationPropsType

const ContactUsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
  return (
    <Stack p={{xs: 1, md: 2}}>
      <BoxedContainer
        justifyContent={'center'}
        alignItems={{xs: 'center', md: 'flex-start'}}
        direction={{xs: 'column', md: 'row'}}
        spacing={4}
      >
        <Stack sx={{width: {xs: '100%', md: 'auto'}}}>
          <ContactUs />
        </Stack>
        <Stack sx={{width: {xs: '100%', md: 'auto'}}}>
          <Location {...props} />
        </Stack>
      </BoxedContainer>
    </Stack>
  )
}

export const getStaticProps: GetStaticProps<ContactUsPagePropsType> = async () => {
  try {
    const initialValue = await CMSService.getInitialValue()
    const location = await CMSService.getOfficeLocation()
    return {props: {...location, initialValue}, revalidate: 84600}
  } catch (error) {
    const location: AddressType = {
      address3: '',
      city: '',
      district: '',
      mobileNo: 0,
      pinCode: 0,
      address1: '',
      address2: '',
      name: '',
      state: ''
    }
    return {props: {location, phone: 0, email: '', mapLink: ''}, revalidate: 30}
  }
}

export default ContactUsPage

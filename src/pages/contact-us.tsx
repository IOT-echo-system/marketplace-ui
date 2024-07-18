import React from 'react'
import type {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next'
import {ContactUs} from '../components/templates'
import type {LocationPropsType} from '../components/molecules'
import {Location} from '../components/molecules'
import {BoxedContainer} from '../components/atoms'
import {Stack} from '@mui/material'
import {CMSService} from '../services'

type ContactUsPagePropsType = {location: LocationPropsType}

const ContactUsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({location}) => {
  return (
    <Stack p={4}>
      <BoxedContainer
        justifyContent={'center'}
        alignItems={{xs: 'center', lg: 'flex-start'}}
        direction={{xs: 'column', lg: 'row'}}
        spacing={4}
      >
        <Stack sx={{width: {xs: '100%', sm: '80%', md: '60%', lg: '50%'}}}>
          <ContactUs />
        </Stack>
        <Stack sx={{width: {xs: '100%', sm: '80%', md: '60%', lg: 'auto'}}}>
          <Location {...location} />
        </Stack>
      </BoxedContainer>
    </Stack>
  )
}

export const getStaticProps: GetStaticProps<ContactUsPagePropsType> = async () => {
  const initialValue = await CMSService.getInitialValue()
  try {
    const location = await CMSService.getOfficeLocation()
    return {props: {location, initialValue}, revalidate: 84600}
  } catch (error) {
    const location: LocationPropsType = {address1: '', address2: '', companyName: '', email: '', mapLink: '', phone: ''}
    return {props: {location, initialValue}, revalidate: 30}
  }
}

export default ContactUsPage

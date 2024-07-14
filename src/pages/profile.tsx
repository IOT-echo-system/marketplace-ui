import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import {CMSService} from '../services'
import React, {useEffect} from 'react'
import {Profile} from '../components/templates/profile/Profile'
import {useSelector} from '../hooks'
import {useRouter} from 'next/router'
import {Config} from '../config'
import {Loader} from '../components/atoms'

const ProfilePage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  const {user} = useSelector(state => state)
  const router = useRouter()

  useEffect(() => {
    if (!user.loading && !user.username) {
      router.push(Config.LOGIN_PAGE_PATH).catch()
    }
  }, [user.loading])

  if (user.loading) {
    return <Loader text={'Loading...'} height={400} />
  }

  return <Profile />
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialValue = await CMSService.getInitialValue()
    return {props: {initialValue}}
  } catch (error) {
    return {props: {}}
  }
}

export default ProfilePage

import type {PropsWithChildren} from 'react'
import React, {useEffect} from 'react'
import {UserService} from '../../services'
import {useDispatch} from '../../hooks'
import {setUser, setUserLoading} from '../../store/actions/user'
import {setAddresses} from '../../store/actions/address'

export const ValidatedProfile: React.FC<PropsWithChildren> = ({children}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    UserService.getUserData()
      .then(user => {
        dispatch(setUser(user))
        UserService.getAddresses()
          .then(addresses => {
            dispatch(setAddresses(addresses))
          })
          .catch()
      })
      .catch()
      .finally(() => {
        dispatch(setUserLoading(false))
      })
  }, [])

  return <>{children}</>
}

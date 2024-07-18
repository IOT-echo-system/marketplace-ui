import type {PropsWithChildren} from 'react'
import React, {useEffect} from 'react'
import {UserService} from '../../services'
import {useDispatch, useSelector} from '../../hooks'
import {setAddresses, setUser, setUserLoading} from '../../store/actions'

export const ValidatedProfile: React.FC<PropsWithChildren> = ({children}) => {
  const dispatch = useDispatch()
  const {username} = useSelector(state => state.user)

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
  }, [username])

  return <>{children}</>
}

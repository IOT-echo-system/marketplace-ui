import type {PropsWithChildren} from 'react'
import React, {useEffect} from 'react'
import {UserService} from '../../services'
import {useDispatch, useSelector} from '../../hooks'
import {setAddresses, setUser, setUserLoading} from '../../store/actions'
import {storage, StorageKeys} from '../../utils/storage'
import {initUserState} from '../../store/reducers'

export const ValidatedProfile: React.FC<PropsWithChildren> = ({children}) => {
  const dispatch = useDispatch()
  const {username} = useSelector(state => state.user)

  useEffect(() => {
    UserService.getUserData()
      .then(({addresses, ...user}) => {
        dispatch(setUser(user))
        dispatch(setAddresses(addresses))
      })
      .catch(() => {
        storage.remove(StorageKeys.AUTH)
        dispatch(setUser({...initUserState}))
      })
      .finally(() => {
        dispatch(setUserLoading(false))
      })
  }, [username])

  return <>{children}</>
}

import React from 'react'
import {Stack, Typography} from '@mui/material'
import {useSelector} from '../../../hooks'
import {formatDate} from '../../../utils/utils'

export const MyAccount: React.FC = () => {
  const {user} = useSelector(state => state)
  return (
    <Stack spacing={1}>
      <Typography variant={'h4'} component={'h1'}>
        My account
      </Typography>
      <Typography>Name: {user.name}</Typography>
      <Typography>Username: {user.username}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>Phone: {user.phone ?? 'NA'}</Typography>
      <Typography>Registered at: {formatDate(user.createdAt)}</Typography>
    </Stack>
  )
}

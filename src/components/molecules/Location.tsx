import React from 'react'
import {Stack, Typography} from '@mui/material'
import {Link} from '../atoms'

export type LocationPropsType = {
  companyName: string
  address1: string
  address2: string
  address3?: string
  address4?: string
  phone: string
  email: string
  mapLink: string
}
export const Location: React.FC<LocationPropsType> = location => {
  return (
    <Stack spacing={2} justifyContent={'start'}>
      <Typography variant={'h4'} component={'div'}>
        Office location
      </Typography>
      <Typography variant={'h5'} component={'div'}>
        {location.companyName}
      </Typography>
      <Stack>
        <Typography>{location.address1}</Typography>
        <Typography>{location.address2}</Typography>
        <Typography>{location.address3}</Typography>
        <Typography>{location.address4}</Typography>
      </Stack>

      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <Typography>
          <strong>Phone</strong>
        </Typography>
        <Link href={`tel:${location.phone}`}>{location.phone}</Link>
      </Stack>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <Typography>
          <strong>Email</strong>
        </Typography>
        <Link href={`mailto:${location.email}`}>{location.email}</Link>
      </Stack>
      <Typography variant={'h5'} component={Link} href={location.mapLink} target={'_blank'}>
        View map
      </Typography>
    </Stack>
  )
}

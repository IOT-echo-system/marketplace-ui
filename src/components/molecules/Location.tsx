import React from 'react'
import {Stack, Typography} from '@mui/material'
import type {AddressType} from '../../store/reducers'
import {Link} from '../atoms'

export type LocationPropsType = {
  location: AddressType
  email: string
  mapLink: string
}
export const Location: React.FC<LocationPropsType> = ({location, email, mapLink}) => {
  return (
    <Stack spacing={2} justifyContent={'start'}>
      <Typography variant={'h5'} component={'div'}>
        Store location
      </Typography>
      <Typography variant={'h6'} component={'div'}>
        {location.name}
      </Typography>
      <Stack>
        <Typography>{location.address1}</Typography>
        <Typography>{location.address2}</Typography>
        <Typography>{location.address3}</Typography>
        <Typography>
          {location.city}, {location.district}, {location.state} - {location.pinCode}
        </Typography>
      </Stack>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Typography fontWeight={'bold'}>Phone</Typography>
        <Link href={`tel:${location.mobileNo}`}>+91-{location.mobileNo}</Link>
      </Stack>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Typography fontWeight={'bold'}> Email</Typography>
        <Link href={`mailto:${email}`}>{email}</Link>
      </Stack>
      <Typography variant={'h6'} component={Link} href={mapLink} target={'_blank'}>
        View map
      </Typography>
    </Stack>
  )
}

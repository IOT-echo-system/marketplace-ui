import React from 'react'
import type {MetaResponseType} from '../../../../services/typing/CMSService'
import {Stack, Typography} from '@mui/material'
import {useMedia} from '../../../../hooks'

type ProductCatalogHeaderPropsType = {title: string} & MetaResponseType
export const ProductCatalogHeader: React.FC<ProductCatalogHeaderPropsType> = ({title, pagination}) => {
  const media = useMedia()
  const start = (pagination.page - 1) * pagination.pageSize + 1
  const end = pagination.page * pagination.pageSize
  return (
    <Stack direction={'row'} flexWrap={'wrap'} alignItems={'center'} spacing={2}>
      <Typography variant={media.sm ? 'h6' : 'h5'} component={'h1'}>
        {title}
      </Typography>
      <Typography variant={media.sm ? 'body2' : 'body1'}>
        (Showing {Math.min(start, pagination.total)} – {Math.min(end, pagination.total)} products of {pagination.total}{' '}
        products)
      </Typography>
    </Stack>
  )
}

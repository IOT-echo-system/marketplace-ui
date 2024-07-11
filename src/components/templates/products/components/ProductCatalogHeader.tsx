import React from 'react'
import type {MetaResponseType} from '../../../../services/typing/CMSService'
import {Stack, Typography} from '@mui/material'

type ProductCatalogHeaderPropsType = {title: string} & MetaResponseType
export const ProductCatalogHeader: React.FC<ProductCatalogHeaderPropsType> = ({title, pagination}) => {
  // eslint-disable-next-line no-mixed-operators
  const start = (pagination.page - 1) * pagination.pageSize + 1
  const end = pagination.page * pagination.pageSize
  return (
    <Stack direction={'row'} flexWrap={'wrap'} alignItems={'center'} spacing={2}>
      <Typography variant={'h5'} component={'h1'}>
        {title}
      </Typography>
      <Typography>
        (Showing {start} – {Math.min(end, pagination.total)} products of {pagination.total} products)
      </Typography>
    </Stack>
  )
}

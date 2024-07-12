import React from 'react'
import {Pagination, WiderBoxedContainer} from '../../atoms'
import {Stack} from '@mui/material'
import type {ProductResponse} from '../../../services/typing/CMSService'
import type {CategoryResponse} from '../../molecules'
import {CategoryFilter, MobileCategoryFilter, ProductCard} from '../../molecules'
import {ProductCatalogHeader} from './components/ProductCatalogHeader'
import {useMedia} from '../../../hooks'

export type ProductCatalogPropsType = {products: ProductResponse; category: CategoryResponse}

export const ProductCatalog: React.FC<ProductCatalogPropsType> = ({products, category}) => {
  const media = useMedia()
  return (
    <WiderBoxedContainer direction={media.md ? 'column' : 'row'} alignItems={'start'} pt={2} pb={2} spacing={2}>
      <Stack bgcolor={'background.paper'} spacing={2} width={media.md ? '100%' : '25%'}>
        {media.md ? (
          <MobileCategoryFilter category={category.category} tree={category.tree} />
        ) : (
          <CategoryFilter category={category.category} tree={category.tree} />
        )}
      </Stack>
      <Stack spacing={2} alignItems={'center'} width={'100%'} pt={media.md ? 2.5 : 0}>
        <Stack p={media.sm ? 1 : 2} bgcolor={'background.paper'} width={'100%'} spacing={2}>
          <ProductCatalogHeader title={category.category.name} pagination={products.meta.pagination} />
          <Stack
            direction={media.sm ? 'column' : 'row'}
            flexWrap={'wrap'}
            spacing={media.sm ? 2 : 0}
            alignItems={media.sm ? 'center' : 'stretch'}
          >
            {products.data.map(({attributes}) => (
              <ProductCard key={attributes.productId} {...attributes} />
            ))}
          </Stack>
        </Stack>
        {products.meta.pagination.pageCount > 1 && (
          <Stack p={media.sm ? 1 : 2} bgcolor={'background.paper'} width={'100%'}>
            <Pagination {...products.meta} />
          </Stack>
        )}
      </Stack>
    </WiderBoxedContainer>
  )
}

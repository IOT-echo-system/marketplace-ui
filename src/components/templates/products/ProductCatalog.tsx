import React from 'react'
import {Pagination, WiderBoxedContainer} from '../../atoms'
import {Stack} from '@mui/material'
import type {ProductResponse} from '../../../services/typing/CMSService'
import {ProductCatalogHeader} from './components/ProductCatalogHeader'
import {useMedia} from '../../../hooks'
import type {CategoryDetails, CategoryDetailsWithChildren, CategoryResponse} from './components'
import {CategoryFilter, isActive} from './components'
import {Breadcrumb, ProductCard} from '../../molecules'

const getBreadcrumbs = ({tree, category}: CategoryResponse): CategoryDetails[] => {
  const breadcrumbs: CategoryDetailsWithChildren[] = []
  tree.forEach(child => isActive(child, category) && breadcrumbs.push(child))
  breadcrumbs.forEach(breadcrumb => {
    if (breadcrumb.children) {
      breadcrumbs.push(...getBreadcrumbs({tree: breadcrumb.children, category}))
    }
  })
  return breadcrumbs
}

export type ProductCatalogPropsType = {products: ProductResponse; category: CategoryResponse}

export const ProductCatalog: React.FC<ProductCatalogPropsType> = ({products, category}) => {
  const media = useMedia()
  const breadcrumbs = getBreadcrumbs(category)

  return (
    <WiderBoxedContainer direction={media.md ? 'column' : 'row'} alignItems={'start'} pt={2} pb={2} spacing={2}>
      <Stack bgcolor={'background.paper'} spacing={2} width={media.md ? '100%' : '25%'}>
        <CategoryFilter category={category.category} tree={category.tree} />
      </Stack>
      <Stack spacing={2} alignItems={'center'} width={'100%'} pt={media.md ? 3 : 0}>
        <Stack p={media.sm ? 1 : 2} bgcolor={'background.paper'} width={'100%'} spacing={1}>
          <Breadcrumb links={breadcrumbs.map(breadcrumb => ({link: breadcrumb.link, label: breadcrumb.name}))} />
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

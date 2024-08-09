import React, {useEffect} from 'react'
import {Pagination as MuiPagination} from '@mui/material'
import type {MetaResponseType} from '../../services/typing/CMSService'
import {useRouter} from 'next/router'
import {useMedia, useScroll} from '../../hooks'

export const Pagination: React.FC<MetaResponseType & {handlePageChange?: (page: number) => void}> = ({
  pagination,
  handlePageChange
}) => {
  const router = useRouter()
  const media = useMedia()
  const {scroll} = useScroll()

  const updatePage = (page: number) => {
    scroll()
    if (handlePageChange) {
      handlePageChange(page)
    } else {
      router.push({pathname: router.pathname, query: {...router.query, page: page}}).catch()
    }
  }

  useEffect(() => {
    if (pagination.page > pagination.pageCount) {
      updatePage(pagination.pageCount)
    }
  }, [pagination])

  const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    updatePage(page)
  }
  return (
    <MuiPagination
      count={pagination.pageCount}
      color={'primary'}
      page={pagination.page}
      onChange={handleChange}
      size={media.sm ? 'small' : 'medium'}
    />
  )
}

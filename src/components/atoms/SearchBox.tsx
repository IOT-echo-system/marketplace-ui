import {Search as SearchIcon} from '@mui/icons-material'
import type {ChangeEvent} from 'react'
import * as React from 'react'
import {useEffect, useState} from 'react'
import {alpha, InputBase, styled} from '@mui/material'
import {CMSService} from '../../services'
import type {OrderProduct} from '../../store/reducers'

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto'
  },
  [theme.breakpoints.up('md')]: {
    width: theme.spacing(54)
  },
  [theme.breakpoints.up('lg')]: {
    width: theme.spacing(80)
  }
}))

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(24),
      padding: theme.spacing(0.5),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(8)
    }
  }
}))

export const SearchBox: React.FC<{size?: 'small' | 'large'}> = ({size}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [querySuggestions, setQuerySuggestions] = useState<OrderProduct[]>([])
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    CMSService.findProductsByNameOrId(searchTerm).then(setQuerySuggestions)
  }, [searchTerm])

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon fontSize={size ?? 'medium'} />
      </SearchIconWrapper>
      <StyledInputBase placeholder="Search…" inputProps={{'aria-label': 'search'}} onChange={handleChange} />
      {JSON.stringify(querySuggestions, null, 2)}
    </Search>
  )
}

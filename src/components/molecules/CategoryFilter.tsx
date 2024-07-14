import React, {useState} from 'react'
import type {StackProps} from '@mui/material'
import {MenuItem, Stack, styled, Typography} from '@mui/material'
import {Link} from '../atoms'
import {ScreenWidth, useMedia} from '../../hooks'

export type CategoryDetails = {name: string; link: string; parent: CategoryDetails | null}
export type CategoryDetailsWithChildren = {children?: CategoryDetailsWithChildren[]} & CategoryDetails
export type CategoryResponse = {category: CategoryDetails; tree: CategoryDetailsWithChildren[]}

const MenuItemContainer = styled(Stack)<StackProps & {active: 'true' | 'false'}>(({theme, active}) => ({
  background: active === 'true' ? theme.palette.grey[300] : theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.grey[100]}`
}))

const Container = styled(Stack)<StackProps>(({theme}) => ({
  position: 'fixed',
  left: 0,
  width: '100%',
  top: theme.spacing(8),
  [`@media (max-width:${ScreenWidth.TABLET - 0.05}px)`]: {
    top: theme.spacing(11)
  },
  [theme.breakpoints.down('sm')]: {
    top: theme.spacing(11)
  },
  background: theme.palette.background.paper,
  zIndex: 3,
  boxShadow: theme.shadows[4]
}))

const CategoryContainer = styled(Stack)<StackProps>(({theme}) => ({
  maxHeight: `calc(100vh - ${theme.spacing(12)})`,
  background: theme.palette.background.paper,
  overflowY: 'auto'
}))

export const isActive = (child: CategoryDetailsWithChildren, category: CategoryDetails): boolean => {
  return (child.link === category.link || child.children?.some(ch => isActive(ch, category))) ?? false
}

const Category: React.FC<CategoryResponse & {pl: number}> = ({tree, category, pl}) => {
  return (
    <Stack>
      {tree.map(child => {
        return (
          <MenuItemContainer key={child.link} active={isActive(child, category) ? 'true' : 'false'}>
            <Link
              href={child.link}
              underline={'false'}
              sx={{color: 'inherit', '&:hover': {color: 'inherit', textDecoration: 'none'}}}
            >
              <MenuItem sx={{textWrap: 'wrap'}}>
                <Typography pl={pl}>{child.name}</Typography>
              </MenuItem>
            </Link>
            {child.children && <Category tree={child.children} pl={pl + 2} category={category} />}
          </MenuItemContainer>
        )
      })}
    </Stack>
  )
}

export const CategoryFilter: React.FC<CategoryResponse> = ({category, tree}) => {
  const media = useMedia()
  const [open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen(!open)
  }

  if (media.md) {
    return (
      <Container>
        <Typography
          variant={'subtitle1'}
          component={'h2'}
          p={1}
          onClick={toggleOpen}
          whiteSpace={'nowrap'}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
        >
          Categories | {category.name}
        </Typography>
        {open && (
          <CategoryContainer>
            <Category tree={tree} pl={0} category={category} />
          </CategoryContainer>
        )}
      </Container>
    )
  }

  return (
    <Stack spacing={1}>
      <Stack p={2} pb={0}>
        <Typography variant={'h5'} component={'h2'}>
          Categories
        </Typography>
      </Stack>
      <Category tree={tree} pl={0} category={category} />
    </Stack>
  )
}

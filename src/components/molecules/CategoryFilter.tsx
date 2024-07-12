import React from 'react'
import type {StackProps} from '@mui/material'
import {MenuItem, Stack, styled, Typography} from '@mui/material'
import {Link} from '../atoms'
import {useMedia} from '../../hooks'

export type CategoryDetails = {name: string; link: string; parent: CategoryDetails | null}
export type CategoryDetailsWithChildren = {children?: CategoryDetailsWithChildren[]} & CategoryDetails
export type CategoryResponse = {category: CategoryDetails; tree: CategoryDetailsWithChildren[]}

const MenuItemContainer = styled(Stack)<StackProps & {active: 'true' | 'false'}>(({theme, active}) => ({
  background: active === 'true' ? theme.palette.grey[300] : theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.grey[100]}`
}))

const isActive = (child: CategoryDetailsWithChildren, category: CategoryDetails): boolean => {
  return (child.link === category.link || child.children?.some(ch => isActive(ch, category))) ?? false
}

const Category: React.FC<CategoryResponse & {pl: number}> = ({tree, category, pl}) => {
  return (
    <Stack>
      {tree.map(child => {
        return (
          <MenuItemContainer key={child.link} active={isActive(child, category) ? 'true' : 'false'}>
            <Link href={child.link} underline={'false'} sx={{'&:hover': {color: 'inherit', textDecoration: 'none'}}}>
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
  if (media.md) {
    return <>Category</>
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

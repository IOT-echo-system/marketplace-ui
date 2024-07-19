import React from 'react'
import type {StackProps} from '@mui/material'
import {MenuItem, Stack, styled, Typography} from '@mui/material'
import {MenuItemLink, Sidebar} from '../../../atoms'

export type CategoryDetails = {name: string; link: string; parent: CategoryDetails | null}
export type CategoryDetailsWithChildren = {children?: CategoryDetailsWithChildren[]} & CategoryDetails
export type CategoryResponse = {category: CategoryDetails; tree: CategoryDetailsWithChildren[]}

const MenuItemContainer = styled(Stack)<StackProps & {active: 'true' | 'false'}>(({theme, active}) => ({
  background: active === 'true' ? theme.palette.grey[300] : theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.grey[100]}`
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
            <MenuItemLink href={child.link}>
              <MenuItem sx={{textWrap: 'wrap'}}>
                <Typography pl={pl}>{child.name}</Typography>
              </MenuItem>
            </MenuItemLink>
            {child.children && <Category tree={child.children} pl={pl + 2} category={category} />}
          </MenuItemContainer>
        )
      })}
    </Stack>
  )
}

export const CategoryFilter: React.FC<CategoryResponse> = ({category, tree}) => {
  return (
    <Sidebar title={'Categories'} mobileTitle={`Categories | ${category.name}`}>
      <Category tree={tree} pl={0} category={category} />
    </Sidebar>
  )
}

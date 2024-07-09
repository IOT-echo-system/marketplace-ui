import React from 'react'
import {styled} from '@mui/material'

const TextContainer = styled('div')(({theme}) => ({
  fontSize: theme.spacing(2.5),
  lineHeight: theme.spacing(4),
  textAlign: 'justify',
  '& > *': {
  },
  '& h1, & h2': {
    fontWeight: 500
  },
  '& h1': {
    fontSize: theme.spacing(5)
  },
  '& h2': {
    fontSize: theme.spacing(4)
  },
  '& a': {
    color: theme.palette.primary.main
  },
  '& ul,& ol': {
    marginLeft: theme.spacing(2.5)
  },
  '& table,& tbody,& thead,& tr,& th,& td': {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderCollapse: 'collapse',
    padding: theme.spacing(1)
  },

}))

export type RTEPropsType = {rte: string}

export const RTE: React.FC<RTEPropsType> = ({rte}) => {
  return <TextContainer>
    <div dangerouslySetInnerHTML={{__html: rte}} />
  </TextContainer>
}

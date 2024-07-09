import React from 'react'
import {styled} from '@mui/material'

const TextContainer = styled('div')(({theme}) => ({
  fontSize: theme.spacing(2.5),
  lineHeight: theme.spacing(4),
  textAlign: 'justify',
  margin: theme.spacing(2),
  '& > *': {
    margin: theme.spacing(2, 0)
  },
  '& h1, & h2': {
    margin: theme.spacing(4, 0, 2, 0),
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
    marginLeft: theme.spacing(2)
  },
  '& table,& tbody,& thead,& tr,& th,& td': {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderCollapse: 'collapse',
    padding: theme.spacing(1)
  },

  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(4)
  }
}))

export type RTEPropsType = {rte: string}

export const RTE: React.FC<RTEPropsType> = ({rte}) => {
  return <TextContainer>
    <div dangerouslySetInnerHTML={{__html: rte}} />
  </TextContainer>
}

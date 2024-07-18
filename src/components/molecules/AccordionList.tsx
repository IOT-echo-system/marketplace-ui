import type {ReactNode} from 'react'
import React from 'react'
import type {AccordionProps, AccordionSummaryProps} from '@mui/material'
import {styled} from '@mui/material'
import {ExpandMoreSharp} from '@mui/icons-material'
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary
} from '../atoms'

export const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} children={props.children} />
))(({theme}) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderTop: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&::before': {
    display: 'none'
  }
}))

export const AccordionSummary = styled((props: AccordionSummaryProps & {disableBorder?: boolean}) => (
  <MuiAccordionSummary {...props} expandIcon={<ExpandMoreSharp />} />
))(({theme, disableBorder}) => ({
  borderBottom: disableBorder ? 0 : `1px solid ${theme.palette.divider}`,
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}))

export const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  padding: theme.spacing(2)
}))

export type AccordionType = {header: ReactNode; content: ReactNode; disabled?: boolean; expanded?: boolean}
type AccordionListPropsType = {accordions: AccordionType[]; disableBorder?: boolean}
export const AccordionList: React.FC<AccordionListPropsType> = ({accordions}) => {
  return (
    <div>
      {accordions.map((accordion, index) => {
        return (
          <Accordion key={`accordion-${index}`} defaultExpanded={accordion.expanded} disabled={accordion.disabled}>
            <AccordionSummary disableBorder>{accordion.header}</AccordionSummary>
            <AccordionDetails>{accordion.content}</AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}

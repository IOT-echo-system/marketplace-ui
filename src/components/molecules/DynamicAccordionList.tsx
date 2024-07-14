import type {ReactNode} from 'react'
import React, {useEffect, useState} from 'react'
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  type AccordionProps,
  AccordionSummary as MuiAccordionSummary,
  type AccordionSummaryProps,
  styled
} from '@mui/material'
import {ExpandMoreSharp} from '@mui/icons-material'

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} children={props.children} />
))(({theme}) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&::before': {
    display: 'none'
  }
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary {...props} expandIcon={<ExpandMoreSharp />} />
))(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}))

export type AccordionType = {header: ReactNode; content: ReactNode; disabled?: boolean}
type DynamicAccordionListPropsType = {
  expandAccordion?: number
  accordions: AccordionType[]
  onChange?: (index: number) => void
}
export const DynamicAccordionList: React.FC<DynamicAccordionListPropsType> = ({
  expandAccordion,
  accordions,
  onChange
}) => {
  const [expanded, setExpanded] = useState(-1)
  useEffect(() => {
    setExpanded(expandAccordion ?? expanded)
  }, [expandAccordion])

  useEffect(() => {
    if (expanded >= 0 && onChange) {
      onChange(expanded)
    }
  }, [expanded])

  const handleChange = (index: number) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? index : -1)
  }

  return (
    <div>
      {accordions.map((accordion, index) => {
        return (
          <Accordion
            key={`accordion-${index}`}
            expanded={expanded === index}
            onChange={handleChange(index)}
            disabled={accordion.disabled}
          >
            <AccordionSummary>{accordion.header}</AccordionSummary>
            <AccordionDetails>{accordion.content}</AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}

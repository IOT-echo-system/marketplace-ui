import React, {useEffect, useState} from 'react'
import type {AccordionType} from './AccordionList'
import {Accordion, AccordionDetails, AccordionSummary} from './AccordionList'

export type DynamicAccordionType = Omit<AccordionType, 'expanded'>

type DynamicAccordionListPropsType = {
  expandAccordion?: number
  accordions: DynamicAccordionType[]
  onChange?: (index: number) => void
}
export const DynamicAccordionList: React.FC<DynamicAccordionListPropsType> = ({
  expandAccordion,
  accordions,
  onChange
}) => {
  const [expanded, setExpanded] = useState(expandAccordion ?? -1)
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

import React from 'react'
import {Button, Link} from './StyledComponents'

export type CTAPropsType = { link: string; label: string; }

export const CTA: React.FC<{ cta: CTAPropsType }> = ({cta}) => {
  return (
    <Link href={cta.link}>
      <Button variant={'contained'} size={'large'}>
        {cta.label}
      </Button>
    </Link>
  )
}

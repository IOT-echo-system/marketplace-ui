import React from 'react'
import {Button, Link} from './StyledComponents'

export type CTAPropsType = {link: string; text: string; newTab: boolean}

export const CTA: React.FC<{cta: CTAPropsType}> = ({cta}) => {
  return (
    <Link href={cta.link} target={cta.newTab ? '_blank' : '_self'}>
      <Button variant={'contained'} size={'large'}>
        {cta.text}
      </Button>
    </Link>
  )
}

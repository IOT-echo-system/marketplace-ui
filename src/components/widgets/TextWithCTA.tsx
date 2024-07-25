import React from 'react'
import type {CTAPropsType} from '../atoms'
import {BoxedContainer, CTAButton} from '../atoms'
import {Stack, styled, Typography} from '@mui/material'
import {useMedia} from '../../hooks'
import type {WidgetPropType} from './index'

const Container = styled(Stack)(({theme}) => ({
  minHeight: theme.spacing(32),
  background: 'skyblue',
  '& .MuiTypography-h2': {
    fontSize: theme.spacing(3),
    fontWeight: 500,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.spacing(3.5)
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: theme.spacing(5)
    }
  },
  '& .MuiButton-root': {
    fontSize: theme.spacing(3),
    textTransform: 'initial',
    fontWeight: 500,
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1, 4),
      fontSize: theme.spacing(2)
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.spacing(2.5)
    }
  }
}))

export type TextWithCTADataType = {text: string; cta: CTAPropsType}

export const TextWithCTA: React.FC<WidgetPropType<TextWithCTADataType>> = ({data}) => {
  const media = useMedia()
  return (
    <Container justifyContent={'center'}>
      <BoxedContainer>
        <Stack
          direction={media.md ? 'column' : 'row'}
          justifyContent={media.md ? 'center' : 'space-between'}
          alignItems={'center'}
          spacing={4}
        >
          <Typography variant={'h2'} textAlign={'center'}>
            {data.text}
          </Typography>
          <CTAButton cta={data.cta} />
        </Stack>
      </BoxedContainer>
    </Container>
  )
}

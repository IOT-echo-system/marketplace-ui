import React, {useEffect, useState} from 'react'
import {Typography} from '@mui/material'

type LoaderPropsType = {text?: string}

export const LoadingText: React.FC<LoaderPropsType> = ({text}) => {
  const [dots, setDots] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDots(dots => (dots + 1) % 4)
    }, 500)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Typography fontStyle={'italic'}>
      {text}
      {'.'.repeat(dots)}
    </Typography>
  )
}

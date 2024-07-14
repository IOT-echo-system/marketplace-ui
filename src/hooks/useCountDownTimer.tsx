import {useEffect, useState} from 'react'

export type CountDownTimerType = {
  time: number
  reset: () => void
  play: () => void
  resetAndPlay: () => void
  pause: () => void
  isRunning: () => boolean
}

export const useCountDownTimer = (initialTime: number): CountDownTimerType => {
  const [time, setTime] = useState(initialTime)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const clearTimer = () => {
    clearInterval(timer ?? 0)
    setTimer(null)
  }

  useEffect(() => {
    if (time === 0) {
      clearTimer()
    }
  }, [time])

  const reset = () => {
    setTime(initialTime)
  }

  const isRunning = (): boolean => {
    return time > 0 && timer !== null
  }

  const play = () => {
    setTimer(
      setInterval(() => {
        setTime(time => time - 1)
      }, 1000)
    )
  }

  const resetAndPlay = () => {
    reset()
    play()
  }

  return {time, reset, play, pause: clearTimer, isRunning, resetAndPlay}
}

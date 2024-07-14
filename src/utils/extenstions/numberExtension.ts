import {Integer} from '../constants'

declare global {
  interface Number {
    isZero(): boolean

    isGreaterThan(threshold: number): boolean

    isGreaterThanZero(): boolean

    isEqualTo(number: number): boolean
  }
}

Number.prototype.isGreaterThan = function (this: number, threshold: number): boolean {
  return this > threshold
}

Number.prototype.isEqualTo = function (this: number, number: number): boolean {
  return this === number
}

Number.prototype.isZero = function (this: number): boolean {
  return this.isEqualTo(Integer.ZERO)
}

Number.prototype.isGreaterThanZero = function (this: number): boolean {
  return this.isGreaterThan(Integer.ZERO)
}

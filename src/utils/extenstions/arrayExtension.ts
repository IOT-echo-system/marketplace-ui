import {Integer} from '../constants'

export {}

declare global {
  interface Array<T> {
    isEmpty(): boolean

    isNotEmpty(): boolean

    first(): T | null

    last(): T | null
  }
}

Array.prototype.isEmpty = function <T>(this: T[]): boolean {
  return this.length === Integer.ZERO
}

Array.prototype.isNotEmpty = function <T>(this: T[]): boolean {
  return !this.isEmpty()
}

Array.prototype.first = function <T>(this: T[]): T | null {
  return this[Integer.ZERO] || null
}

Array.prototype.last = function <T>(this: T[]): T | null {
  return this[this.length - Integer.ONE] || null
}

const UNDEFINED = 'undefined'
type StorageType = 'sessionStorage' | 'localStorage'

export const StorageKeys = {
  CART: 'cart',
  SELLER_CART: 'seller_cart',
  AUTH: 'auth'
} as const

class Storage {
  private readonly storageType: StorageType

  constructor(storageType: StorageType) {
    this.storageType = storageType
  }

  clear() {
    if (typeof window !== UNDEFINED) {
      window[this.storageType].clear()
    }
  }

  remove(keyName: string) {
    if (typeof window !== UNDEFINED) {
      window[this.storageType].removeItem(keyName)
    }
  }

  setItem<T extends Record<string, unknown> | Array<Record<string, unknown>>>(keyName: string, value: T): T {
    if (typeof window !== UNDEFINED) {
      window[this.storageType].setItem(keyName, JSON.stringify(value))
    }
    return value
  }

  getItem<T extends Record<string, unknown> | Array<Record<string, unknown>>>(keyName: string, defaultValue: T): T {
    if (typeof window !== UNDEFINED) {
      const value = window[this.storageType].getItem(keyName)
      if (!value) {
        return defaultValue
      }
      return JSON.parse(value) as T
    }
    return defaultValue
  }
}

class SessionStorage extends Storage {
  static readonly storage = new SessionStorage()

  constructor() {
    super('sessionStorage')
  }
}

class LocalStorage extends Storage {
  static readonly storage = new LocalStorage()

  constructor() {
    super('localStorage')
  }
}

export const localStorage = LocalStorage.storage
export const sessionStorage = SessionStorage.storage
export const storage = localStorage

import {renderHook} from '@testing-library/react'
import {useMedia} from '../../src/hooks'

describe('useMedia hook test', () => {
  it('should get initial values', () => {
    const {result} = renderHook(useMedia)

    expect(result.current).toStrictEqual({sm: false, md: false, lg: false, xl: false})
  })
})

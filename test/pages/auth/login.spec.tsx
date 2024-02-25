import React from 'react'
import {render} from '@testing-library/react'
import LoginPage from '../../../src/pages/auth/login'
import {LogIn} from '../../../src/components/templates/auth'

jest.mock('../../../src/components/templates/auth')
jest.mock('../../../src/components/templates/auth/login/Login')

describe('Login page test', () => {
  beforeEach(jest.clearAllMocks)
  afterEach(jest.clearAllMocks)

  it('should match with the snapshot', () => {
    const {container} = render(<LoginPage />)

    expect(container).toMatchSnapshot()
    expect(LogIn).toHaveBeenCalledTimes(1)
    expect(LogIn).toHaveBeenCalledWith({}, {})
  })
})

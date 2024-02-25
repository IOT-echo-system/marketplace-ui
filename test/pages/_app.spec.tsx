import {render} from '@testing-library/react'

import type {Router} from 'next/router'
import App from '../../src/pages/_app'

jest.mock('../../src/services/authService')
describe('_App page test', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match with the snapshot for unauthorized path', () => {
    const mockRouter = {asPath: '/auth/login', pathname: '/auth/login'} as unknown as Router
    const TestComponent = () => {
      return <div>Mock Component</div>
    }

    const {container} = render(<App router={mockRouter} Component={TestComponent} pageProps={'props'} />)

    expect(container).toMatchSnapshot()
  })
  /*
  it('should match with the snapshot for authorized path', () => {
    const mockRouter = {asPath: '/', pathname: '/'} as unknown as Router
    const mockValidate = jest.fn().mockResolvedValue({userId: 'userId'})
    jest
      .spyOn(AuthApiService, 'AuthService')
      .mockReturnValue({validate: mockValidate} as unknown as ReturnType<typeof AuthService>)
    jest.spyOn(console, 'error').mockImplementation()

    const TestComponent = () => {
      return <div>Mock Component</div>
    }

    act(() => {
      const {container} = render(<App router={mockRouter} Component={TestComponent} pageProps={'props'} />)
      expect(container).toMatchSnapshot()
    })

    expect(mockValidate).toHaveBeenCalledTimes(1)
  })

  it('should match with the snapshot for authorized path with unauthorized user', () => {
    const mockPush = jest.fn()
    const mockRouter = {asPath: '/', pathname: '/', push: mockPush} as unknown as Router
    const mockValidate = jest.fn().mockRejectedValue({errorCode: 'IOT-4000', message: 'Unauthorized user!'})
    jest
      .spyOn(AuthApiService, 'AuthService')
      .mockReturnValue({validate: mockValidate} as unknown as ReturnType<typeof AuthService>)
    const TestComponent = () => {
      return <div>Mock Component</div>
    }

    act(() => {
      const {container} = render(<App router={mockRouter} Component={TestComponent} pageProps={'props'} />)
      expect(container).toMatchSnapshot()
    })

    expect(mockValidate).toHaveBeenCalledTimes(1)
    // expect(mockPush).toHaveBeenCalledTimes(1)
    // expect(mockPush).toHaveBeenCalledWith()
  })*/
})

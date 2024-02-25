import {render} from '@testing-library/react'
import SignUpPage from '../../../src/pages/auth/signup'
import {SignUp} from '../../../src/components/templates/auth'


jest.mock('../../../src/components/templates/auth/signup/SignUp')

describe('SignUp page test', () => {
  beforeEach(jest.clearAllMocks)
  afterEach(jest.clearAllMocks)

  it('should match with the snapshot', () => {
    const {container} = render(<SignUpPage />)

    expect(container).toMatchSnapshot()
    expect(SignUp).toHaveBeenCalledTimes(1)
    expect(SignUp).toHaveBeenCalledWith({}, {})
  })
})

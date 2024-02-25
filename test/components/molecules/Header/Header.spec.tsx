import {render} from '@testing-library/react'
import {Header} from '../../../../src/components/molecules'

describe('Header Molecules test', () => {
  it('should match with the snapshot', () => {
    const {container} = render(<Header />)

    expect(container).toMatchSnapshot()
  })
})

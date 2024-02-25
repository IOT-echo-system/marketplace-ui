import {render} from '@testing-library/react'
import {ToastWrapper} from '../../../src/components/atoms'

describe('Toast Wrapper component test', () => {
  it('should match with the snapshot', () => {
    const TestComponent = () => {
      return <div></div>
    }

    const {container} = render(
      <ToastWrapper>
        <TestComponent />
      </ToastWrapper>
    )

    expect(container).toMatchSnapshot()
  })
})

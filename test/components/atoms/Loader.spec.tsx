import {render} from '@testing-library/react'
import {Loader} from '../../../src/components/atoms'

describe('Loader component test', () => {
  it('should match with the snapshot', () => {
    const {container} = render(<Loader />)

    expect(container).toMatchSnapshot()
  })

  it('should match with the snapshot for page loader', () => {
    const {container} = render(<Loader page loadingText={'Loading...'} />)

    expect(container).toMatchSnapshot()
  })
})

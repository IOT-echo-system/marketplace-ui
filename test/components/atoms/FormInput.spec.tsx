import {render} from '@testing-library/react'
import {FormInput} from '../../../src/components/atoms'

describe('Form Input component test', () => {
  it('should match with the snapshot', () => {
    const {container} = render(<FormInput />)

    expect(container).toMatchSnapshot()
  })
})

import {render} from '@testing-library/react'
import {
  FooterContainer,
  Search,
  SearchIconWrapper,
  StyledInputBase
} from '../../../../src/components/molecules/Header/StyledHeader'

describe('StyledHeader Molecules test', () => {
  it('should match with the snapshot', () => {
    const {container} = render(<SearchIconWrapper />)

    expect(container).toMatchSnapshot()
  })

  it('should match with the snapshot for styled input base', () => {
    const {container} = render(<StyledInputBase />)

    expect(container).toMatchSnapshot()
  })

  it('should match with the snapshot for Search', () => {
    const {container} = render(<Search />)

    expect(container).toMatchSnapshot()
  })

  it('should match with the snapshot for FooterContainer', () => {
    const {container} = render(<FooterContainer />)

    expect(container).toMatchSnapshot()
  })
})

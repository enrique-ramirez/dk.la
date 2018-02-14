import React from 'react'
import { shallow } from 'enzyme'

import Header from 'components/Header/view'

import LogoBlack from '../logo_black.svg'
import LogoWhite from '../logo_white.svg'

describe('<Header />', () => {
  it('should render the logo element', () => {
    const wrapper = shallow(<Header match={{}} />)

    expect(wrapper.find(LogoBlack)).toHaveLength(1)
  })

  it('should render a white logo for splash route', () => {
    const wrapper = shallow(<Header
      match={{ path: '/' }}
    />)

    expect(wrapper.find(LogoWhite)).toHaveLength(1)
  })
})

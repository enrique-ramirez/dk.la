import React from 'react'
import PropTypes from 'prop-types'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'
import { fromJS } from 'immutable'
import { MemoryRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

import ConnectedSplash from 'modules/Splash'

describe('Connected <Splash />', () => {
  const initialState = fromJS({
    resources: {
      splash: {
        loading: false,
        page: {
          afc: {
            featured_video_webm: 'someFile.webm',
            featured_video_mp4: 'someVideo.webm',
          },
        },
      },
    },
  })

  let mockStore
  let store

  beforeAll(() => {
    mockStore = configureStore([])
    store = mockStore(initialState)
  })

  it('props should match mapStateToProps', () => {
    const wrapper = shallow(<ConnectedSplash store={store} />)

    expect(wrapper.prop('splash')).toEqual(initialState.getIn(['resources', 'splash']))
  })

  it('props should match mapDispatchToProps', () => {
    mount(
      <IntlProvider locale="en" messages={{ en: {} }}>
        <MemoryRouter>
          <ConnectedSplash />
        </MemoryRouter>
      </IntlProvider>,
      {
        context: { store },
        childContextTypes: { store: PropTypes.object.isRequired },
      },
    )

    const actions = store.getActions()
    const splashActions = actions.filter(action => action.type.includes('/splash/'))

    expect(splashActions).toHaveLength(1)
  })
})

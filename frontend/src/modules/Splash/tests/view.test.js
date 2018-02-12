import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import Splash from 'modules/Splash/view'

describe('<Splash />', () => {
  const initialState = fromJS({
    splash: {
      loading: false,
      page: {
        afc: {
          featured_video_webm: 'someFile.webm',
          featured_video_mp4: 'someVideo.webm',
        },
      },
    },
  })

  let loadSplash
  let wrapper

  beforeEach(() => {
    loadSplash = jest.fn()
    wrapper = shallow(<Splash
      loadSplash={loadSplash}
      splash={initialState.get('splash')}
    />)
  })

  it('should not render a video element when loading is true', () => {
    wrapper = shallow(<Splash
      loadSplash={loadSplash}
      splash={initialState.get('splash').set('loading', true)}
    />)

    expect(wrapper.find('video')).toHaveLength(0)
  })

  it('should render a video element when loading is false', () => {
    expect(wrapper.find('video')).toHaveLength(1)
    expect(wrapper.find('source')).toHaveLength(2)
  })

  it('should update only when splash prop has changed', () => {
    const shouldUpdate = wrapper.instance().shouldComponentUpdate({
      splash: initialState.get('splash').setIn(['page', 'afc', 'hello'], 'hello'),
    })
    const shouldNotUpdate = wrapper.instance().shouldComponentUpdate({
      splash: initialState.get('splash'),
    })

    expect(shouldUpdate).toBe(true)
    expect(shouldNotUpdate).toBe(false)
  })

  it('should call loadSplash when mounted', () => {
    expect(loadSplash).toHaveBeenCalledTimes(1)
  })
})

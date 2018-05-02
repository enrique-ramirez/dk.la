import { createAction, handleActions } from 'redux-actions'
import { takeLatest, put, call, all } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { fromJS, Map } from 'immutable'
import { normalize, denormalize } from 'normalizr'
import { LOCATION_CHANGE } from 'react-router-redux'
import get from 'lodash.get'

import {
  SUCCESS,
  ERROR,
  PENDING,
  domain,
} from 'store/constants'
import post from 'store/schemas/post'
import video from 'store/schemas/video'
import parseVideoURL from 'utils/parseVideoURL'

import {
  fetchPost,
  fetchVimeoData,
} from 'utils/api'

/* Actions */
const viewPost = domain.defineAction('viewPost')

export const LOAD_POST = viewPost.defineAction('LOAD_POST', [PENDING, SUCCESS, ERROR])
export const LOAD_VIDEO = viewPost.defineAction('LOAD_VIDEO', [PENDING, SUCCESS, ERROR])
export const CHANGE_VIDEO = viewPost.defineAction('CHANGE_VIDEO', [SUCCESS])

/* Reducer */
const defaultState = fromJS({
  loading: true,
  post: 0,
  currentVideo: undefined,
})

const reducer = handleActions({
  [LOAD_POST.SUCCESS]: (state, action) => (
    state
      .set('loading', false)
      .set('post', action.payload.get('post'))
  ),
  [CHANGE_VIDEO.SUCCESS]: (state, action) => (
    state
      .set('currentVideo', action.payload)
  ),
  [LOCATION_CHANGE]: () => (
    defaultState
  ),
}, defaultState)

export default reducer

/* Selectors */
export const getViewPost = (state) => {
  // eslint-disable-next-line reselect/first-param-name
  const viewPostWithEntities = state.reduce((aggr, value, key) => {
    let result = aggr

    if (key === 'entities') {
      result = result.set(key, value)
    }

    if (key === 'resources') {
      result = result.set('viewPost', value.get('viewPost'))
    }

    return result
  }, Map())

  return viewPostWithEntities
}

export const makeGetViewPost = () => createSelector(
  getViewPost,
  (state) => {
    const postResult = denormalize(state.getIn(['viewPost', 'post']), post, state.get('entities')) || Map({})
    const result = {
      loading: state.getIn(['viewPost', 'loading']),
      post: postResult || {},
    }

    if (postResult.getIn(['acf', 'videos'])) {
      const currentVideo = state.getIn(['viewPost', 'currentVideo'])
        ? denormalize(state.getIn(['viewPost', 'currentVideo']), video, state.get('entities'))
        : postResult.getIn(['acf', 'videos', 0])

      result.currentVideo = currentVideo
    }

    return fromJS(result)
  },
)

/* Action Creators */
export const loadPost = createAction(LOAD_POST.ACTION)
export const changeVideo = createAction(CHANGE_VIDEO.SUCCESS)

/* Side Effects */
export function* loadVideoSaga(videoData) {
  try {
    const data = { ...videoData }

    if (data.type === 'vimeo') {
      const response = yield call(fetchVimeoData, data.id)
      data.thumbnail = response.json[0].thumbnail_medium
    }

    const normalized = yield call(normalize, data, video)

    yield put({
      type: LOAD_VIDEO.SUCCESS,
      payload: fromJS(normalized.result),
      entities: fromJS(normalized.entities),
    })
  } catch (err) {
    yield put({ type: LOAD_VIDEO.ERROR, payload: { error: err, videoData } })
  }
}

export function* loadPostSaga(action) {
  try {
    // Get POST
    const response = yield call(fetchPost, action.payload)
    const data = { ...response.json[0] }

    const videos = yield call(get, data, 'acf.video_links', [])
    const parsedVideos = videos.map(({ video_link: url }) => parseVideoURL(url))

    if (videos.length) {
      data.acf.videos = parsedVideos.map(({ id }) => id)
    }

    yield all(parsedVideos.map(videoData => call(loadVideoSaga, videoData)))

    const normalized = yield call(normalize, data, post)

    yield put({
      type: LOAD_POST.SUCCESS,
      payload: Map({
        post: normalized.result,
        currentVideo: undefined,
      }),
      entities: fromJS(normalized.entities),
    })
  } catch (err) {
    yield put({ type: LOAD_POST.ERROR, payload: { error: err } })
  }
}

/* eslint-disable */
export const viewPostWatchers = [
  takeLatest(LOAD_POST.ACTION, loadPostSaga),
]
/* eslint-enable */

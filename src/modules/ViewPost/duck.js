import { createAction, handleActions } from 'redux-actions'
import { takeLatest, put, call } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { fromJS, Map } from 'immutable'
import { normalize, denormalize } from 'normalizr'
import { LOCATION_CHANGE } from 'react-router-redux'

import {
  SUCCESS,
  ERROR,
  PENDING,
  domain,
} from 'store/constants'

import post from 'store/schemas/post'

import {
  fetchPost,
} from 'utils/api'

/* Actions */
const viewPost = domain.defineAction('viewPost')

export const LOAD_POST = viewPost.defineAction('LOAD_POST', [PENDING, SUCCESS, ERROR])

/* Reducer */
const defaultState = fromJS({
  loading: true,
  post: 0,
})

const reducer = handleActions({
  [LOAD_POST.SUCCESS]: (state, action) => (
    state
      .set('loading', false)
      .set('post', action.payload.get('post'))
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
    const postResult = denormalize(state.getIn(['viewPost', 'post']), post, state.get('entities'))

    return fromJS({
      loading: state.getIn(['viewPost', 'loading']),
      post: postResult,
    })
  },
)

/* Action Creators */
export const loadPost = createAction(LOAD_POST.ACTION)

/* Side Effects */
export function* loadPostSaga(action) {
  try {
    // Get POST
    const response = yield call(fetchPost, action.payload)

    const normalized = yield call(normalize, response.json[0], post)
    yield put({
      type: LOAD_POST.SUCCESS,
      payload: Map({
        post: normalized.result,
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

import { createAction, handleActions } from 'redux-actions'
import { takeLatest, put, call } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { fromJS, Map } from 'immutable'
import { normalize, denormalize } from 'normalizr'

import { union } from 'utils/immutableHelpers'

import {
  SUCCESS,
  ERROR,
  PENDING,
  domain,
} from 'store/constants'

import post from 'store/schemas/post'
import page from 'store/schemas/page'

import {
  fetchPosts,
} from 'utils/api'

/* Actions */
const projects = domain.defineAction('projects')

export const LOAD_POSTS = projects.defineAction('LOAD_POSTS', [PENDING, SUCCESS, ERROR])

/* Reducer */
const defaultState = fromJS({
  loading: true,
  page: undefined,
  posts: [],
})

const reducer = handleActions({
  [LOAD_POSTS.SUCCESS]: (state, action) => (
    state
      .set('loading', false)
      .set('posts', union(state.get('posts'), action.payload))
  ),
}, defaultState)

export default reducer

/* Selectors */
export const getProjects = (state) => {
  // eslint-disable-next-line reselect/first-param-name
  const splashWithEntities = state.reduce((aggr, value, key) => {
    let result = aggr

    if (key === 'entities') {
      result = result.set(key, value)
    }

    if (key === 'resources') {
      result = result.set('projects', value.get('projects'))
    }

    return result
  }, Map())

  return splashWithEntities
}

export const makeGetProjects = () => createSelector(
  getProjects,
  (state) => {
    const postsResult = denormalize(state.getIn(['projects', 'posts']), [post], state.get('entities'))
    const pageResult = denormalize(state.getIn(['projects', 'page']), page, state.get('entities'))

    return Map({
      loading: state.getIn(['projects', 'loading']),
      posts: postsResult,
      page: pageResult,
    })
  },
)

/* Action Creators */
export const loadPosts = createAction(LOAD_POSTS.ACTION)

/* Side Effects */
export function* loadPostsSaga() {
  try {
    const response = yield call(fetchPosts)
    const normalized = yield call(normalize, response, [post])
    yield put({
      type: LOAD_POSTS.SUCCESS,
      payload: fromJS(normalized.result),
      entities: fromJS(normalized.entities),
    })
  } catch (err) {
    yield put({ type: LOAD_POSTS.ERROR, payload: { error: err } })
  }
}

/* eslint-disable */
export const projectsWatchers = [
  takeLatest(LOAD_POSTS.ACTION, loadPostsSaga),
]
/* eslint-enable */

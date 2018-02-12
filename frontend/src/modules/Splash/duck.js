import { createAction, handleActions } from 'redux-actions'
import { takeLatest, put, call } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { fromJS, Map } from 'immutable'
import { normalize, denormalize } from 'normalizr'

import {
  SUCCESS,
  ERROR,
  PENDING,
  domain,
} from 'store/constants'

import page from 'store/schemas/page'

import {
  fetchSplashPage,
} from 'utils/api'

/* Actions */
const splash = domain.defineAction('splash')

export const LOAD_SPLASH = splash.defineAction('LOAD_SPLASH', [PENDING, SUCCESS, ERROR])

/* Reducer */
const defaultState = fromJS({
  loading: true,
  page: undefined,
})

const reducer = handleActions({
  [LOAD_SPLASH.SUCCESS]: (state, action) => state.set('loading', false).set('page', action.payload),
}, defaultState)

export default reducer

/* Selectors */
export const getSplash = (state) => {
  // eslint-disable-next-line reselect/first-param-name
  const splashWithEntities = state.reduce((aggr, value, key) => {
    let result = aggr

    if (key === 'entities') {
      result = result.set(key, value)
    }

    if (key === 'resources') {
      result = result.set('splash', value.get('splash'))
    }

    return result
  }, Map())

  return splashWithEntities
}

export const makeGetSplash = () => createSelector(
  getSplash,
  (state) => {
    const result = denormalize(state.getIn(['splash', 'page']), page, state.get('entities'))

    return Map({
      loading: state.getIn(['splash', 'loading']),
      page: result,
    })
  },
)

/* Action Creators */
export const loadSplash = createAction(LOAD_SPLASH.ACTION)

/* Side Effects */
export function* loadSplashSaga() {
  try {
    const response = yield call(fetchSplashPage)
    const normalized = yield call(normalize, response, page)
    yield put({
      type: LOAD_SPLASH.SUCCESS,
      payload: fromJS(normalized.result),
      entities: fromJS(normalized.entities),
    })
  } catch (err) {
    yield put({ type: LOAD_SPLASH.ERROR, payload: { error: err } })
  }
}

/* eslint-disable */
export const splashWatchers = [
  takeLatest(LOAD_SPLASH.ACTION, loadSplashSaga),
]
/* eslint-enable */

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
  fetchPage,
} from 'utils/api'

/* Actions */
const viewPage = domain.defineAction('viewPage')

export const LOAD_PAGE = viewPage.defineAction('LOAD_PAGE', [PENDING, SUCCESS, ERROR])

/* Reducer */
const defaultState = fromJS({
  loading: true,
  page: 0,
})

const reducer = handleActions({
  [LOAD_PAGE.SUCCESS]: (state, action) => (
    state
      .set('loading', false)
      .set('page', action.payload.get('page'))
  ),
}, defaultState)

export default reducer

/* Selectors */
export const getViewPage = (state) => {
  // eslint-disable-next-line reselect/first-param-name
  const viewPageWithEntities = state.reduce((aggr, value, key) => {
    let result = aggr

    if (key === 'entities') {
      result = result.set(key, value)
    }

    if (key === 'resources') {
      result = result.set('viewPage', value.get('viewPage'))
    }

    return result
  }, Map())

  return viewPageWithEntities
}

export const makeGetViewPage = () => createSelector(
  getViewPage,
  (state) => {
    const pageResult = denormalize(state.getIn(['viewPage', 'page']), page, state.get('entities')) || Map({})
    const result = {
      loading: state.getIn(['viewPage', 'loading']),
      page: pageResult || {},
    }

    return fromJS(result)
  },
)

/* Action Creators */
export const loadPage = createAction(LOAD_PAGE.ACTION)

/* Side Effects */
export function* loadPageSaga(action) {
  try {
    // Get PAGE
    const response = yield call(fetchPage, action.payload)
    const data = { ...response.json[0] }


    const normalized = yield call(normalize, data, page)

    yield put({
      type: LOAD_PAGE.SUCCESS,
      payload: Map({
        page: normalized.result,
      }),
      entities: fromJS(normalized.entities),
    })
  } catch (err) {
    yield put({ type: LOAD_PAGE.ERROR, payload: { error: err } })
  }
}

/* eslint-disable */
export const viewPageWatchers = [
  takeLatest(LOAD_PAGE.ACTION, loadPageSaga),
]
/* eslint-enable */

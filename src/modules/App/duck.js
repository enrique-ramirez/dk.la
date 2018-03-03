import { createAction, handleActions } from 'redux-actions'
import { takeLatest, put, call } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

import {
  SUCCESS,
  ERROR,
  PENDING,
  domain,
} from 'store/constants'

import {
  fetchMenuLocations,
} from 'utils/api'

/* Actions */
const app = domain.defineAction('app')

export const LOAD_HEADER_MENU = app.defineAction('LOAD_HEADER_MENU', [PENDING, SUCCESS, ERROR])

/* Reducer */
const defaultState = fromJS({
  menus: {
    header: {
      loading: true,
      links: [],
    },
  },
})

const reducer = handleActions({
  [LOAD_HEADER_MENU.SUCCESS]: (state, action) => (
    state
      .setIn(['menus', 'header', 'loading'], false)
      .setIn(['menus', 'header', 'links'], action.payload)
  ),
}, defaultState)

export default reducer

/* Selectors */
export const getApp = state => state.getIn(['resources', 'app'])

export const makeGetHeaderMenu = () => createSelector(
  getApp,
  state => state.getIn(['menus', 'header']),
)

/* Action Creators */
export const loadHeaderMenu = createAction(LOAD_HEADER_MENU.ACTION)

/* Side Effects */
export function* loadHeaderMenuSaga() {
  try {
    const response = yield call(fetchMenuLocations, 'header-menu')
    yield put({
      type: LOAD_HEADER_MENU.SUCCESS,
      payload: fromJS(response.json),
    })
  } catch (err) {
    yield put({ type: LOAD_HEADER_MENU.ERROR, payload: { error: err } })
  }
}

/* eslint-disable */
export const appWatchers = [
  takeLatest(LOAD_HEADER_MENU.ACTION, loadHeaderMenuSaga),
]
/* eslint-enable */

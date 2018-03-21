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
export const LOAD_FOOTER_MENU = app.defineAction('LOAD_FOOTER_MENU', [PENDING, SUCCESS, ERROR])

/* Reducer */
const defaultState = fromJS({
  menus: {
    header: {
      loading: true,
      links: [],
    },
    footer: {
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
  [LOAD_FOOTER_MENU.SUCCESS]: (state, action) => (
    state
      .setIn(['menus', 'footer', 'loading'], false)
      .setIn(['menus', 'footer', 'links'], action.payload)
  ),
}, defaultState)

export default reducer

/* Selectors */
export const getApp = state => state.getIn(['resources', 'app'])

export const makeGetHeaderMenu = () => createSelector(
  getApp,
  state => state.getIn(['menus', 'header']),
)

export const makeGetFooterMenu = () => createSelector(
  getApp,
  state => state.getIn(['menus', 'footer']),
)

/* Action Creators */
export const loadHeaderMenu = createAction(LOAD_HEADER_MENU.ACTION)
export const loadFooterMenu = createAction(LOAD_FOOTER_MENU.ACTION)

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

export function* loadFooterMenuSaga() {
  try {
    const response = yield call(fetchMenuLocations, 'footer-menu')
    yield put({
      type: LOAD_FOOTER_MENU.SUCCESS,
      payload: fromJS(response.json),
    })
  } catch (err) {
    yield put({ type: LOAD_FOOTER_MENU.ERROR, payload: { error: err } })
  }
}

/* eslint-disable */
export const appWatchers = [
  takeLatest(LOAD_HEADER_MENU.ACTION, loadHeaderMenuSaga),
  takeLatest(LOAD_FOOTER_MENU.ACTION, loadFooterMenuSaga),
]
/* eslint-enable */

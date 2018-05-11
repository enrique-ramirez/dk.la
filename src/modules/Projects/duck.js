import { createAction, handleActions } from 'redux-actions'
import { takeLatest, put, call, all } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { fromJS, Map } from 'immutable'
import { normalize, denormalize } from 'normalizr'

import {
  SUCCESS,
  ERROR,
  PENDING,
  domain,
} from 'store/constants'

import post from 'store/schemas/post'
import page from 'store/schemas/page'
import media from 'store/schemas/media'
import category from 'store/schemas/category'

import {
  fetchPage,
  fetchPosts,
  fetchMedia,
  fetchCategories,
} from 'utils/api'

const uniqflat = array => [...new Set(array.reduce((aggr, current) => (
  aggr.concat(Array.isArray(current) ? uniqflat(current) : current)
), []))]

/* Actions */
const projects = domain.defineAction('projects')

export const LOAD_POSTS = projects.defineAction('LOAD_POSTS', [PENDING, SUCCESS, ERROR])
export const LOAD_MEDIA = projects.defineAction('LOAD_MEDIA', [PENDING, SUCCESS, ERROR])
export const LOAD_CATEGORY = projects.defineAction('LOAD_CATEGORY', [PENDING, SUCCESS, ERROR])

/* Reducer */
const defaultState = fromJS({
  loading: true,
  page: undefined,
  pagination: {
    page: 1,
    totalPages: 1,
  },
  posts: [],
})

const reducer = handleActions({
  [LOAD_POSTS.SUCCESS]: (state, action) => (
    state
      .set('loading', false)
      .set('posts', state.get('posts').concat(action.payload.get('posts').filter(id => state.get('posts').indexOf(id) < 0)))
      .set('page', action.payload.get('page'))
      .setIn(['pagination', 'totalPages'], parseInt(action.payload.getIn(['pagination', 'totalPages']), 10))
      .setIn(['pagination', 'page'], action.payload.getIn(['pagination', 'page']))
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

    return fromJS({
      loading: state.getIn(['projects', 'loading']),
      posts: postsResult,
      page: pageResult,
      pagination: {
        page: state.getIn(['projects', 'pagination', 'page']),
        totalPages: state.getIn(['projects', 'pagination', 'totalPages']),
      },
    })
  },
)

/* Action Creators */
export const loadPosts = createAction(LOAD_POSTS.ACTION)
export const loadMedia = createAction(LOAD_MEDIA.ACTION)
export const loadCategory = createAction(LOAD_CATEGORY.ACTION)

/* Side Effects */
export function* loadMediaSaga(id) {
  try {
    const response = yield call(fetchMedia, id)
    const normalized = yield call(normalize, response.json, media)
    yield put({
      type: LOAD_MEDIA.SUCCESS,
      payload: fromJS(normalized.result),
      entities: fromJS(normalized.entities),
    })
  } catch (err) {
    yield put({ type: LOAD_MEDIA.ERROR, payload: { error: err, id } })
  }
}

export function* loadCategorySaga(id) {
  try {
    const response = yield call(fetchCategories, id)
    const normalized = yield call(normalize, response.json, category)
    yield put({
      type: LOAD_CATEGORY.SUCCESS,
      payload: fromJS(normalized.result),
      entities: fromJS(normalized.entities),
    })
  } catch (err) {
    yield put({ type: LOAD_CATEGORY.ERROR, payload: { error: err, id } })
  }
}

export function* loadPostsSaga(action) {
  try {
    // Get Page
    const responsePage = yield call(fetchPage, 'posts')
    const normalizedPage = yield call(normalize, responsePage.json[0], page)

    // Get POSTS
    const posts = yield call(fetchPosts, action.payload)

    // Get featured media
    const featuredMediaIds = posts.json.map(item => item.featured_media).filter(Number)
    yield all(featuredMediaIds.map(id => call(loadMediaSaga, id)))

    // get categories
    const categoriesIds = uniqflat(posts.json.map(item => item.categories))
    yield all(categoriesIds.map(id => call(loadCategorySaga, id)))

    const normalized = yield call(normalize, posts.json, [post])
    yield put({
      type: LOAD_POSTS.SUCCESS,
      payload: fromJS({
        posts: normalized.result,
        pagination: { ...posts.pagination, page: action.payload || 1 },
        page: normalizedPage.result,
      }),
      entities: fromJS({ ...normalized.entities, ...normalizedPage.entities }),
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

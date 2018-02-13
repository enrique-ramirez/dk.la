import { all } from 'redux-saga/effects'
import { splashWatchers } from 'modules/Splash/duck'
import { projectsWatchers } from 'modules/Projects/duck'

/* eslint-disable */
export default function* rootSaga() {
  yield all([
    ...splashWatchers,
    ...projectsWatchers,
  ])
}
/* eslint-enable */

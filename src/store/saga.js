import { all } from 'redux-saga/effects'
import { splashWatchers } from 'modules/Splash/duck'
import { projectsWatchers } from 'modules/Projects/duck'
import { appWatchers } from 'modules/App/duck'

/* eslint-disable */
export default function* rootSaga() {
  yield all([
    ...splashWatchers,
    ...projectsWatchers,
    ...appWatchers,
  ])
}
/* eslint-enable */

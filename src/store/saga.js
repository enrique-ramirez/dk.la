import { all } from 'redux-saga/effects'
import { splashWatchers } from 'modules/Splash/duck'
import { projectsWatchers } from 'modules/Projects/duck'
import { appWatchers } from 'modules/App/duck'
import { viewPostWatchers } from 'modules/ViewPost/duck'

/* eslint-disable */
export default function* rootSaga() {
  yield all([
    ...splashWatchers,
    ...projectsWatchers,
    ...appWatchers,
    ...viewPostWatchers,
  ])
}
/* eslint-enable */

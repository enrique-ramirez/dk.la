import { all } from 'redux-saga/effects'
import { splashWatchers } from 'modules/Splash/duck'

/* eslint-disable */
export default function* rootSaga() {
  yield all([
    ...splashWatchers,
  ])
}
/* eslint-enable */

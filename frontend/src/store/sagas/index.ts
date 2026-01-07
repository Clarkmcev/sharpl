import { all, fork } from 'redux-saga/effects'
import authSaga from './authSaga'
import usersSaga from './usersSaga'
import onboardingSaga from './onboardingSaga'

// Root saga
export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(usersSaga),
    fork(onboardingSaga),
  ])
}

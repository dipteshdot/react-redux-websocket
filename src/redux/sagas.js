import { all } from 'redux-saga/effects';

import machines from './machines/sagas';

// ADD NEW SAGA HERE
export default function* rootSaga (getState) {
	yield all([machines()]);
}

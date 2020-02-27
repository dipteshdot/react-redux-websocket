import { call, put, takeLatest } from 'redux-saga/effects';

import { MACHINES, successMachines, errorMachines, ALL, successAllMachines, errorAllMachines } from './actions';
import { CONSTANTS } from '../../enum';
import request from '../../utils/request';

const { REQUESTED, EDIT, API_URL } = CONSTANTS;

function* RequestAllMachines ({ payload }) {
	try {
		const response = yield call(request, {
			method: 'GET',
			url: `${API_URL}/machines`,
			data: payload
		});
		if (response.status === 200) {
			yield put(successMachines(response.data));
		} else if (response.status === 403) {
			yield put(errorMachines(response.data.Error));
		} else if (response.status === 404) {
			yield put(errorMachines('Error while Loading Data'));
		} else if (response.status === 500) {
			yield put(errorMachines(response.data.Error));
		}
	} catch (error) {
		yield put(errorMachines(error.message));
	}
}

function* RequestMachinesById ({ payload }) {
	try {
		const response = yield call(request, {
			method: 'GET',
			url: `${API_URL}/machines/${payload}`
		});
		if (response.status === 200) {
			yield put(successAllMachines(response));
		} else if (response.status === 404) {
			yield put(errorAllMachines('Error while Loading Data'));
		} else if (response.status === 500) {
			yield put(errorAllMachines(response.data.Error));
		}
	} catch (error) {
		yield put(errorAllMachines(error.message));
	}
}

function* UpdateMachine ({ payload }) {
	try {
		const { name, id } = payload;
		const response = yield call(request, {
			method: 'PUT',
			url: `${API_URL}/machines/${id}`,
			data: {
				'name': name
			}
		});
		if (response.status === 200) {
			yield put(successMachines(response.data));
		} else if (response.status === 403) {
			yield put(errorMachines(response.data.Error));
		} else if (response.status === 404) {
			yield put(errorMachines('Error while Loading Data'));
		} else if (response.status === 500) {
			yield put(errorMachines(response.data.Error));
		}
	} catch (error) {
		yield put(errorMachines(error.message));
	}
}
export default function* Machines () {
	yield takeLatest(MACHINES + REQUESTED, RequestAllMachines);
	yield takeLatest(MACHINES + ALL + REQUESTED, RequestMachinesById);
	yield takeLatest(MACHINES + EDIT, RequestMachinesById);
	yield takeLatest(MACHINES + EDIT + REQUESTED, UpdateMachine);
}

import { fromJS } from 'immutable';

import { MACHINES } from './actions';
import { CONSTANTS } from '../../enum';

const { EDIT, REQUESTED, SUCCEDED, ERROR, CLEAR } = CONSTANTS;

const initialState = fromJS({
	error: '',
	message: '',
	machines: [],
	machine: {},
	isLoading: false
});

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case MACHINES + REQUESTED:
			return {
				...state,
				error: null,
				machines: null,
				isLoading: true
			};
		case MACHINES + SUCCEDED:
			return {
				...state,
				machines: payload,
				error: null,
				isLoading: false
			};
		case MACHINES + ERROR:
			return {
				...state,
				machines: null,
				error: payload,
				isLoading: false
			};
		case MACHINES + EDIT + REQUESTED:
			return {
				...state,
				error: null,
				machine: payload,
				isLoading: true
			};
		case MACHINES + EDIT + SUCCEDED:
			return {
				...state,
				error: null,
				machine: payload,
				isLoading: true
			};
		case MACHINES + EDIT + ERROR:
			return {
				...state,
				machine: null,
				error: payload,
				isLoading: false
			};
		case MACHINES + CLEAR:
			return initialState;
		default:
			return state;
	}
};

export default reducer;

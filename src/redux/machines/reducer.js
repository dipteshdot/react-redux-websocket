import { fromJS } from 'immutable';

import { MACHINES, ALL } from './actions';
import { CONSTANTS } from '../../enum';

const { EDIT, REQUESTED, SUCCEDED, ERROR, CLEAR } = CONSTANTS;

const initialState = fromJS({
	error: '',
	message: '',
	machines: [],
	machine: {},
	requestedMachine: {},
	isLoading: false
});

const reducer = (state = initialState, { type, payload }) => {
	console.log('payload :: ', payload);
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
		case MACHINES + ALL + REQUESTED:
			return {
				...state,
				error: null,
				requestedMachine: null,
				isLoading: true
			};
		case MACHINES + ALL + SUCCEDED:
			return {
				...state,
				requestedMachine: payload,
				error: null,
				isLoading: false
			};
		case MACHINES + ALL + ERROR:
			return {
				...state,
				requestedMachine: null,
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

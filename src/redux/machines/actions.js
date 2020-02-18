import { CONSTANTS } from '../../enum';

const { REQUESTED, EDIT, SUCCEDED, ERROR } = CONSTANTS;
export const MACHINES = 'MACHINES';

// Machines
export const requestMachines = payload => ({
	type: MACHINES + REQUESTED,
	payload
});

export const errorMachines = error => ({
	type: MACHINES + ERROR,
	payload: error
});

export const successMachines = payload => ({
	type: MACHINES + SUCCEDED,
	payload
});

// Edit Machines
export const requestEditMachines = payload => ({
	type: MACHINES + EDIT + REQUESTED,
	payload
});

export const successEditMachine = payload => ({
	type: MACHINES + EDIT + SUCCEDED,
	payload
});

export const errorEditMachine = error => ({
	type: MACHINES + ERROR,
	payload: error
});

import { ENV } from '../config';

export default {
	EDIT: '_EDIT',
	CANCELED: '_CANCELED',
	REQUESTED: '_REQUESTED',
	PROGRESS: '_PROGRESS', // For upload progress update
	SUCCEDED: '_SUCCEDED',
	STARTED: '_STARTED',
	SKIPPED: '_SKIPPED',
	FAILED: '_FAILED',
	ERROR: '_ERROR',
	CLEAR: '_CLEAR',

	// API base URL
	API_URL: ENV.API.URL
};

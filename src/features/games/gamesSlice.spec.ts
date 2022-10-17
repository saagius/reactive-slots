import gamesReducer, { GamesState } from './gamesSlice';

describe('games reducer', () => {
	const initialState: GamesState = {
		list: {},
		status: 'loading',
		needsUpdating: false
	};

	it('should handle initial state', () => {
		expect(gamesReducer(undefined, { type: 'unknown' })).toEqual({
			list: {},
			status: 'loading',
			needsUpdating: false
		});
	});
});

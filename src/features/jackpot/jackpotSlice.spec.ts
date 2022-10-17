import jackpotReducer, { JackpotState } from './jackpotSlice';

describe('jackpot reducer', () => {
	const initialState: JackpotState = {
		list: {},
		status: 'idle'
	};

	it('should handle initial state', () => {
		expect(jackpotReducer(undefined, { type: 'unknown' })).toEqual({
			list: {},
			status: 'idle'
		});
	});
});

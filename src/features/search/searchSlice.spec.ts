import searchReducer, { SearchState } from './searchSlice';

describe('search reducer', () => {
	const initialState: SearchState = {
		value: ''
	};

	it('should handle initial state', () => {
		expect(searchReducer(undefined, { type: 'unknown' })).toEqual({
			value: ''
		});
	});
});

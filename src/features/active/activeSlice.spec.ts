import activeReducer from './activeSlice';

describe('active reducer', () => {
	const initialState = true;

	it('should handle initial state', () => {
		expect(activeReducer(undefined, { type: 'unknown' })).toEqual(true);
	});
});

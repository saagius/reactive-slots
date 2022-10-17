import categoryReducer, { CategoryState } from './categorySlice';

describe('category reducer', () => {
	const initialState: CategoryState = {
		list: [],
		selectedCategory: 'new'
	};

	it('should handle initial state', () => {
		expect(categoryReducer(undefined, { type: 'unknown' })).toEqual({
			list: [],
			selectedCategory: 'new'
		});
	});
});

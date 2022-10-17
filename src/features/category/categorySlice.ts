import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CategoryState {
	list: string[];
	selectedCategory: string;
}

const initialState: CategoryState = {
	list: [],
	selectedCategory: 'new'
};

export const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories: (state, action: PayloadAction<string[]>) => {
			state.list = action.payload;
		},
		setSelectedCategory: (state, action: PayloadAction<string>) => {
			state.selectedCategory = action.payload;
		}
	}
});

export const { setCategories, setSelectedCategory } = categorySlice.actions;

export const selectCategories = (state: RootState) => state.categories.list;
export const selectSelectedCategory = (state: RootState) => state.categories.selectedCategory;

export default categorySlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ActiveState {
	active: boolean;
}

const initialState: ActiveState = {
	active: true
};

export const activeSlice = createSlice({
	name: 'browser',
	initialState,
	reducers: {
		setActive: (state, action: PayloadAction<boolean>) => {
			state.active = action.payload;
		}
	}
});

export const { setActive } = activeSlice.actions;

export const selectActive = (state: RootState) => state.browser.active;

export default activeSlice.reducer;

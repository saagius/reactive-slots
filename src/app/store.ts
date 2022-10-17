import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import gamesReducer from '../features/games/gamesSlice';
import jackpotReducer from '../features/jackpot/jackpotSlice';
import categoryReducer from '../features/category/categorySlice';
import searchReducer from '../features/search/searchSlice';
import activeReducer from '../features/active/activeSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		games: gamesReducer,
		jackpots: jackpotReducer,
		categories: categoryReducer,
		search: searchReducer,
		browser: activeReducer
	}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
	RootState,
	unknown,
	Action<string>>;

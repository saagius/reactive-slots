import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchGames } from './gamesAPI';
import { setCategories } from '../category/categorySlice';
import { getDistinctCategoriesFromGames } from '../category/categoryHelper';

export interface Game {
	id: string;
	name: string;
	image: string;
	categories: string[];
}

export interface Games {
	[x: string]: Game;
}

export interface GamesState {
	list: Games;
	status: string;
	needsUpdating: boolean;
}

const initialState: GamesState = {
	list: {},
	status: 'loading',
	needsUpdating: false
};

export const fetchGamesAsync = createAsyncThunk(
	'game/fetchGames',
	async (_, thunkAPI) => {
		const response = await fetchGames();
		thunkAPI.dispatch(setCategories(getDistinctCategoriesFromGames(response.data)));
		return response.data;
	}
);

export const pollGamesAsync = createAsyncThunk(
	'game/pollGames',
	async (_, thunkAPI) => {
		const response = await new Promise<string>((resolve) => {
			setInterval(() => {
				const state = thunkAPI.getState() as RootState;
				const windowIsActive = state.browser.active;

				if (windowIsActive) {
					thunkAPI.dispatch(fetchGamesAsync());
				} else {
					thunkAPI.dispatch(gamesNeedsUpdating(true));
				}

				resolve('done');
			}, 60000);
		});

		return response;
	}
);

export const gamesSlice = createSlice({
	name: 'games',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		gamesNeedsUpdating: (state, action: PayloadAction<boolean>) => {
			state.needsUpdating = action.payload;
		}
	},
	// The `extraReducers` field lets the slice handle actions defined elsewhere,
	// including actions generated by createAsyncThunk or in other slices.
	extraReducers: (builder) => {
		builder
			.addCase(fetchGamesAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchGamesAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				action.payload.forEach(game => {
					state.list[game.id] = game;
				});
			})
			.addCase(fetchGamesAsync.rejected, (state) => {
				state.status = 'failed';
			});
	}
});

export const { gamesNeedsUpdating } = gamesSlice.actions;

export const selectGame = (id: string) => (state: RootState) => state.games.list[id];

export const selectGamesNeedsUpdating = (state: RootState) => state.games.needsUpdating;

export const selectGamesLoaded = (state: RootState) => state.games.status === 'idle';

const otherCategories = ['fun', 'virtual', 'ball'];
export const selectVisibleGameIds = (state: RootState) => {
	const games = state.games.list;
	const selectedCategory = state.categories.selectedCategory;
	const search = state.search.value;

	let gamesToShow: Game[] = [];

	if (games && selectedCategory) {
		gamesToShow = Object.keys(games).map(key => games[key]).filter((game: Game) => {
			if (selectedCategory === 'other') {
				return game.categories.some(cat => {
					return otherCategories.includes(cat);
				});
			}

			return game.categories.includes(selectedCategory);
		});
	} else {
		gamesToShow = Object.keys(games).map(key => games[key]);
	}

	if (search) {
		gamesToShow = gamesToShow.filter(game => game.name.toLowerCase().includes(search.toLowerCase()));
	}

	return gamesToShow.map(game => game.id);
};

export default gamesSlice.reducer;

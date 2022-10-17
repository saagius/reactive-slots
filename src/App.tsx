import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { Counter } from './features/counter/Counter';
import { Category } from './features/category/Category';
import { Games } from './features/games/Games';
import './App.scss';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setSelectedCategory } from './features/category/categorySlice';
import { getBrowserVisibilityProp, getIsDocumentHidden } from './features/active/activeHelper';
import { setActive } from './features/active/activeSlice';
import {
	fetchGamesAsync,
	gamesNeedsUpdating,
	selectGamesLoaded,
	selectGamesNeedsUpdating
} from './features/games/gamesSlice';
import { Header } from './features/header/Header';
import { capitalize } from './utils';
import useWindowDimensions from './features/windowDimensions';
import { Loader } from './features/loader/Loader';

function App() {
	const [loaded, setLoaded] = useState(false);
	const location = useLocation();
	const dispatch = useAppDispatch();
	const _gamesNeedsUpdating = useAppSelector(selectGamesNeedsUpdating);
	const gamesLoaded = useAppSelector(selectGamesLoaded);

	const windowDimensions = useWindowDimensions();
	const {
		width
	} = windowDimensions;
	const isMobile = width <= 576;

	useEffect(() => {
		if (location.pathname.startsWith('/games')) {
			const categoryInPath = location.pathname.split('/')[2];
			dispatch(setSelectedCategory(categoryInPath));

			document.title = `White Casino - ${ capitalize(categoryInPath) } Games`;
		}

		const onVisibilityChange = () => {
			const documentHidden = getIsDocumentHidden();

			dispatch(setActive(documentHidden));

			if (_gamesNeedsUpdating) {
				dispatch(fetchGamesAsync());
				dispatch(gamesNeedsUpdating(false));
			}
		};

		const visibilityChange = getBrowserVisibilityProp();

		document.addEventListener(visibilityChange, onVisibilityChange, false);

		if (!loaded && gamesLoaded) {
			setLoaded(true);
		}

		return () => {
			document.removeEventListener(visibilityChange, onVisibilityChange);
		};
	}, [location, dispatch, _gamesNeedsUpdating, gamesLoaded, loaded]);

	return (
		<>
			<div className={ `App${ isMobile ? ' mobile' : '' }` }>
				<Header></Header>
				<Category></Category>
				<Routes>
					<Route path={ '/games/:category' } element={ Games() }/>
					<Route path={ '/counter' } element={ Counter() }/>
					<Route path="*" element={ <Navigate to="/games/new"/> }/>
				</Routes>
			</div>
			<Loader loaded={ loaded }></Loader>
		</>
	);
}

export default App;

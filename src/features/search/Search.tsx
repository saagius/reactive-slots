import React, { SyntheticEvent, useMemo, useState } from 'react';
import { debounce } from 'lodash';

import { useAppDispatch } from '../../app/hooks';
import { setSearch } from './searchSlice';
import './Search.scss';

export function Search() {
	const dispatch = useAppDispatch();

	const [searchValue, setSearchValue] = useState('');

	const setSearchValueToReduxState = useMemo(() =>
			debounce((latestValue: string) => {
				dispatch(setSearch(latestValue));
			}, 500),
		[dispatch]
	);

	const onSearchQueryInput = (event: SyntheticEvent<HTMLInputElement, Event>): void => {
		const searchQuery = (event.target as HTMLInputElement).value;
		setSearchValue(searchQuery);
		setSearchValueToReduxState(searchQuery);
	};

	return (
		<div className="app-search">
			<div className="search">
				<div className="search-wrapper">
					<input
						type="text"
						className="form-control"
						id="searchQuery"
						value={ searchValue }
						onChange={ onSearchQueryInput }
						placeholder="Search for Game"
					/>
				</div>
			</div>
		</div>
	);
}

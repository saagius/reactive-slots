import React from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectJackpots } from './jackpotSlice';
import './Jackpot.scss';

export function Game() {
	const jackpots = useAppSelector(selectJackpots);
	const dispatch = useAppDispatch();

	return (
		<div>

		</div>
	);
}

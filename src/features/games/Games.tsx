import React from 'react';

import { useAppSelector } from '../../app/hooks';
import { selectVisibleGameIds } from './gamesSlice';
import './Games.scss';
import { Game } from '../game/Game';

export function Games() {
	const visibleGameIds = useAppSelector(selectVisibleGameIds);

	return (
		<div className="games">
			<div className="games-wrapper">
				{
					visibleGameIds && visibleGameIds.map(gameId => (
						<Game key={ gameId } id={ gameId }></Game>
					))
				}
			</div>
		</div>
	);
}

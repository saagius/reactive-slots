import React from 'react';

import './GameDetail.scss';
import { useAppSelector } from '../../app/hooks';
import { selectGame } from '../games/gamesSlice';

interface GameDetailProps {
	id: string;
}

export function GameDetail(props: GameDetailProps) {
	const {
		id
	} = props;
	const game = useAppSelector(selectGame(id));

	return (
		<div className="game-details">
			<div className="game-name">{ game.name }</div>
			<button>Play</button>
		</div>
	);
}

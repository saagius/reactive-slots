import React from 'react';

import './Game.scss';
import { GameJackpot } from '../gameJackpot/GameJackpot';
import { GameRibbon } from '../gameRibbon/GameRibbon';
import { GameImage } from '../gameImage/GameImage';
import { GameDetail } from '../gameDetail/GameDetail';

interface GameProps {
	id: string;
}

export function Game(props: GameProps) {
	const {
		id
	} = props;

	return (
		<div className="game-wrapper">
			<div className="game">
				<GameJackpot id={ id }></GameJackpot>
				<GameRibbon id={ id }></GameRibbon>
				<GameImage id={ id }></GameImage>
				<GameDetail id={ id }></GameDetail>
			</div>
		</div>
	);
}

import React from 'react';

import './GameJackpot.scss';
import { useAppSelector } from '../../app/hooks';
import { selectJackpot } from '../jackpot/jackpotSlice';

interface GameJackpotProps {
	id: string;
}

function currencyFormat(currency: string, num: number) {
	return `${ currency }${ num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }`;
}

export function GameJackpot(props: GameJackpotProps) {
	const {
		id
	} = props;
	const jackpot = useAppSelector(selectJackpot(id));

	if (jackpot) {
		return (
			<div className="game-jackpot">
				{ currencyFormat('£', jackpot.amount) }
			</div>
		);
	}

	return null;
}

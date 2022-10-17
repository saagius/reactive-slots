import React from 'react';

import './GameRibbon.scss';
import { useAppSelector } from '../../app/hooks';
import { selectGame } from '../games/gamesSlice';
import { selectSelectedCategory } from '../category/categorySlice';

interface GameRibbonProps {
	id: string;
}

export function GameRibbon(props: GameRibbonProps) {
	const {
		id
	} = props;
	const game = useAppSelector(selectGame(id));
	const selectedCategory = useAppSelector(selectSelectedCategory);

	const isNew = (): boolean => {
		return game ? game.categories.includes('new') && selectedCategory !== 'new' : false;
	};

	const isTop = (): boolean => {
		return game ? game.categories.includes('top') && selectedCategory !== 'top' && !isNew() : false;
	};

	if (game && selectedCategory) {
		return (
			<div className="game-ribbon">
				{
					isNew() && (
						<div className="box">
							<div className="ribbon right">New</div>
						</div>
					)
				}
				{
					isTop() && (
						<div className="box">
							<div className="ribbon right">Top</div>
						</div>
					)
				}
			</div>
		);
	}

	return null;
}

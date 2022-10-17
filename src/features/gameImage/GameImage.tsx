import React, { SyntheticEvent, useState } from 'react';

import './GameImage.scss';
import { useAppSelector } from '../../app/hooks';
import { selectGame } from '../games/gamesSlice';
import { selectSelectedCategory } from '../category/categorySlice';

interface GameImageProps {
	id: string;
}

export function GameImage(props: GameImageProps) {
	const {
		id
	} = props;
	const game = useAppSelector(selectGame(id));
	const selectedCategory = useAppSelector(selectSelectedCategory);
	const [imageFound, setImageFound] = useState(true);

	const handleMissingImage = (event: SyntheticEvent<HTMLImageElement, Event>): void => {
		(event.target as HTMLImageElement).style.display = 'none';
		(event.target as HTMLImageElement).onerror = null;
		setImageFound(false);
	};

	if (game && selectedCategory) {
		return (
			<div className="game-image">
				<img src={ game.image } alt={ game.name } onError={ handleMissingImage } loading="lazy"/>
				{ !imageFound && <div className="game-image-not-found">Image not available</div> }
			</div>
		);
	}

	return null;
}

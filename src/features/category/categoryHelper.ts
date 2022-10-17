import { Game } from '../games/gamesSlice';

const otherCategory = [
	'fun',
	'virtual',
	'ball'
];

export const getDistinctCategoriesFromGames = (games: Game[]): string[] => {
	const distinctCategories: string[] = [];

	games.forEach(game => {
		game.categories.forEach(category => {
			let categoryToAdd = category;

			if (otherCategory.includes(category)) {
				categoryToAdd = 'other';
			}

			if (!distinctCategories.includes(categoryToAdd)) {
				distinctCategories.push(categoryToAdd);
			}
		});
	});

	return distinctCategories;
};

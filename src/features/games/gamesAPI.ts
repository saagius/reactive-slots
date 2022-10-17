import axios from 'axios';
import config from '../../config/config.json';
import { Game } from './gamesSlice';

const {
	apiRoot
} = config;

export function fetchGames() {
	return axios.get<Game[]>(`${ apiRoot }/games.php`);
}

import axios from 'axios';
import config from '../../config/config.json';
import { Jackpot } from './jackpotSlice';

const {
	apiRoot
} = config;

export function fetchJackpots() {
	return axios.get<Jackpot[]>(`${ apiRoot }/jackpots.php`);
}

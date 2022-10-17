import logo from '../../logo.png';
import React from 'react';
import './Header.scss';
import { Search } from '../search/Search';

export function Header() {
	return (
		<header className="app-header">
			<div className="header">
				<div className="logo">
					<img src={ logo } alt="White Casino"/>
				</div>
				<div className="title">White Casino</div>
			</div>
			<Search></Search>
		</header>
	);
}

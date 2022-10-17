import React, { useEffect, useState } from 'react';
import logo from '../../logo.png';
import './Loader.scss';

type Props = {
	loaded: boolean
}

export function Loader(props: Props) {
	const {
		loaded
	} = props;

	const [hideLoader, setHideLoader] = useState(false);

	useEffect(() => {
		let timeout: any;
		if (!hideLoader && loaded) {
			timeout = setTimeout(() => {
				setHideLoader(true);
			}, 1000);
		}

		return () => clearTimeout(timeout);
	});

	return (
		<div className={ `loader${ loaded ? ' loaded' : '' }${ hideLoader ? ' hidden' : '' }` }>
			<img src={ logo } alt="White Casino"/>
			<div>Loading...</div>
		</div>
	);
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useAppSelector } from '../../app/hooks';
import { selectCategories, selectSelectedCategory } from './categorySlice';
import './Category.scss';
import { capitalize } from '../../utils';
import useWindowDimensions from '../windowDimensions';

export function Category() {
	const categories = useAppSelector(selectCategories);
	const selectedCategory = useAppSelector(selectSelectedCategory);
	const windowDimensions = useWindowDimensions();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const {
		width
	} = windowDimensions;
	const isMobile = width <= 576;

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className="app-categories">
			{
				!isMobile && <nav className="categories">
                <ul className="categories-menu">
					{
						categories && categories.map(category => {
							return (
								<li key={ category } className={ selectedCategory === category ? 'selected' : '' }>
									<Link to={ `/games/${ category }` }>{ capitalize(category) }</Link>
								</li>
							);
						})
					}
                </ul>
              </nav>
			}
			{
				isMobile && <div className="categories">
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={ open ? 'long-menu' : undefined }
                  aria-expanded={ open ? 'true' : undefined }
                  aria-haspopup="true"
                  onClick={ handleClick }
                >
                  <MoreVertIcon/>
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={ {
					  'aria-labelledby': 'long-button'
				  } }
                  anchorEl={ anchorEl }
                  open={ open }
                  onClose={ handleClose }
                  PaperProps={ {
					  style: {
						  maxHeight: 48 * 4.5,
						  width: '20ch'
					  }
				  } }
                >
					{ categories && categories.map((category) => (
						<MenuItem
							key={ category }
							selected={ selectedCategory === category }
							onClick={ handleClose }
							component={ Link }
							to={ `/games/${ category }` }>
							{ capitalize(category) }
						</MenuItem>
					)) }
                </Menu>
              </div>
			}
		</div>
	);
}

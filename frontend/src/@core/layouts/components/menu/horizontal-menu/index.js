// ** React Imports
import { useState } from 'react';

// ** Horizontal Menu Array
import navigation from '@src/navigation/horizontal';

// ** Horizontal Menu Components
import HorizontalNavMenuItems from './HorizontalNavMenuItems';
import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import NavbarSearch from '../../navbar/NavbarSearch';
import UserDropdown from '../../navbar/UserDropdown';

const HorizontalMenu = ({ currentActiveItem, routerProps }) => {
	// ** States
	const [activeItem, setActiveItem] = useState(null);
	const [groupActive, setGroupActive] = useState([]);
	const [openDropdown, setOpenDropdown] = useState([]);

	// ** On mouse enter push the ID to openDropdown array
	const onMouseEnter = (id) => {
		const arr = openDropdown;
		arr.push(id);
		setOpenDropdown([...arr]);
	};

	// ** On mouse leave remove the ID to openDropdown array
	const onMouseLeave = (id) => {
		const arr = openDropdown;
		arr.splice(arr.indexOf(id), 1);
		setOpenDropdown([...arr]);
	};

	return (
		<div className="navbar-container main-menu-content">
			<ul className="nav navbar-nav" id="main-menu-navigation">
				<HorizontalNavMenuItems
					submenu={false}
					items={navigation}
					activeItem={activeItem}
					groupActive={groupActive}
					routerProps={routerProps}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					openDropdown={openDropdown}
					setActiveItem={setActiveItem}
					setGroupActive={setGroupActive}
					setOpenDropdown={setOpenDropdown}
					currentActiveItem={currentActiveItem}
				/>
			</ul>

			<ul className="nav navbar-nav align-items-center ml-auto">
				<NavItem className="d-none d-lg-block"></NavItem>
				<NavbarSearch />
				<UserDropdown />
			</ul>
		</div>
	);
};

export default HorizontalMenu;

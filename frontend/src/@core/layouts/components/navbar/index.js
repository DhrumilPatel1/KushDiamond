// ** React Imports
import { Fragment } from 'react';

// ** Dropdowns Imports
import UserDropdown from './UserDropdown';
import NavbarSearch from './NavbarSearch';

// ** Third Party Components
import { Sun, Moon } from 'react-feather';
import { NavItem, NavLink } from 'reactstrap';


const ThemeNavbar = ({ skin, setSkin }) => {
	// ** Function to toggle Theme (Light/Dark)
	const ThemeToggler = () => {
		if (skin === 'dark') {
			return <Sun className="ficon" onClick={() => setSkin('light')} />;
		} else {
			return <Moon className="ficon" onClick={() => setSkin('dark')} />;
		}
	};

	return (
		<Fragment>
			
			<ul className="nav navbar-nav align-items-center ml-auto">
				<NavItem className="d-none d-lg-block">
					<NavLink className="nav-link-style">
						<ThemeToggler />
					</NavLink>
				</NavItem>
				<NavbarSearch />
				<UserDropdown />
			</ul>
		</Fragment>
	);
};

export default ThemeNavbar;

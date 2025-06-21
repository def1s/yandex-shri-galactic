import styles from './Menu.module.css';

import { MenuItem } from '../MenuItem/MenuItem';

import { MENU_TABS } from '../../model/const';

export const Menu = () => {
	const menuTabs = Object.entries(MENU_TABS);

	return (
		<div className={styles.menu}>
			{menuTabs.map(([path, tab]) => (
				<MenuItem name={tab.name} key={tab.name} path={path} Icon={tab.Icon} />
			))}
		</div>
	);
};

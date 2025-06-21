import { NavLink } from 'react-router';
import { classNames } from '@/shared';

import type { MenuItemType } from '../../model/types';

import styles from './MenuItem.module.css';

type Props = MenuItemType & {
	path: string;
};

export const MenuItem = (props: Props) => {
	const { name, path, Icon } = props;

	return (
		<NavLink
			to={path}
			className={({ isActive }) => classNames(styles.menuItem, isActive && styles.active)}
		>
			{Icon}

			<span>{name}</span>
		</NavLink>
	);
};

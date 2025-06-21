import summerSchoolLogo from '@/shared/assets/summer_school_logo.png';
import { Menu } from '../Menu/Menu';

import styles from './Navbar.module.css';

export const Navbar = () => {
	return (
		<div className={styles.navbar}>
			<img src={summerSchoolLogo} className={styles.logo} alt={'summer school logo'} />

			<div className={styles.serviceName}>МЕЖГАЛАКТИЧЕСКАЯ АНАЛИТИКА</div>

			<Menu />
		</div>
	);
};

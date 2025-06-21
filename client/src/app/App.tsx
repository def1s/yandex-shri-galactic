import { AppRouter } from './providers';

import { Navbar } from '@/widgets';

import styles from './App.module.css';

import './styles/index.css';
import './styles/reset.css';
import './styles/variables.css';

export const App = () => {
	return (
		<div className={styles.content}>
			<Navbar />
			<AppRouter />
		</div>
	);
};

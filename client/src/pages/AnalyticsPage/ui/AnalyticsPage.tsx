import { AnalyzeCsvFile } from '@/features';
import { Analytics } from '@/entities';

import styles from './AnalyticsPage.module.css';

export const AnalyticsPage = () => {
	return (
		<div className={styles.analytics}>
			<AnalyzeCsvFile />
			<Analytics />
		</div>
	);
};

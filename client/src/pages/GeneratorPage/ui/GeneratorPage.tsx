import { GenerateCsv } from '@/features';

import styles from './GeneratorPage.module.css';

export const GeneratorPage = () => {
	return (
		<div className={styles.generator}>
			<GenerateCsv />
		</div>
	);
};

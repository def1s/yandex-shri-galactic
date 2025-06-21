import { useGetGeneratedCsv } from '../api/useGetGeneratedCsv';
import { Button } from '@/shared';

import styles from './GenerateCsv.module.css';
import { useState } from 'react';

const downloadFromUrl = (url: string) => {
	const a = document.createElement('a');
	a.href = url;
	a.download = 'report.csv';

	document.body.appendChild(a);
	a.click();
	a.remove();

	URL.revokeObjectURL(url);
};

export const GenerateCsv = () => {
	const [isGenerated, setIsGenerated] = useState(false);

	// TODO: везде обрабатывать состояние
	const { generateCsv, isLoading, error } = useGetGeneratedCsv();

	const handleGenerateCsv = async () => {
		const { url } = await generateCsv({ size: 0.1 });

		if (!url) {
			return;
		}

		downloadFromUrl(url);
		setIsGenerated(true);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.label}>Сгенерируйте готовый csv-файл нажатием одной кнопки</div>

			{!isGenerated && (
				<Button onClick={handleGenerateCsv} theme={'green'} isLoading={isLoading}>
					Начать генерацию
				</Button>
			)}

			{/* TODO: здесь вообще другой компонент нужно юзать */}
			{isGenerated && <div>get</div>}

			{isLoading && <div className={styles.helperText}>идет процесс генерации</div>}
		</div>
	);
};

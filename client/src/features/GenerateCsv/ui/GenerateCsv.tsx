import { useGetGeneratedCsv } from '../api/useGetGeneratedCsv';
import { Button, CancelButton, classNames } from '@/shared';

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
	const { generateCsv, isLoading, error, clearErrors } = useGetGeneratedCsv();

	const handleGenerateCsv = async () => {
		const { url } = await generateCsv({ size: 0.1 });

		if (!url) {
			return;
		}

		downloadFromUrl(url);
		setIsGenerated(true);
	};

	const handleRemove = () => {
		setIsGenerated(false);
		clearErrors();
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.label}>Сгенерируйте готовый csv-файл нажатием одной кнопки</div>

			{!isGenerated && !error && (
				<Button onClick={handleGenerateCsv} theme={'green'} isLoading={isLoading}>
					Начать генерацию
				</Button>
			)}

			{/** TODO: это нужно в отдельный компонент!!! Но я не успеваю :(( Мб вернусь позже, если будет время */}
			{isGenerated && !error && (
				<div className={styles.wrapper}>
					<div className={styles.actions}>
						<button className={styles.button}>Done!</button>

						<CancelButton onClick={handleRemove} />
					</div>

					<div className={styles.infoText}>файл сгенерирован!</div>
				</div>
			)}

			{!isGenerated && error && (
				<div className={styles.wrapper}>
					<div className={styles.actions}>
						<button className={classNames(styles.button, styles.errorButton)}>
							Ошибка
						</button>

						<CancelButton onClick={handleRemove} />
					</div>

					<div className={styles.errorText}>{error}</div>
				</div>
			)}

			{isLoading && <div className={styles.helperText}>идет процесс генерации</div>}
		</div>
	);
};

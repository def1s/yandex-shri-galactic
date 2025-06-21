import { Button, LoadZone } from '@/shared';
import { useCallback, useEffect, useState } from 'react';
import { useGetAnalytics } from '../api/useGetAnalytics';
import { historyAnalyzeController, useAnalyticsStore } from '@/entities';

import styles from './AnalyzeCsvFile.module.css';

export const AnalyzeCsvFile = () => {
	const [selectedFile, setSelectedFile] = useState<File>();
	const [isAnalyzeSuccess, setIsAnalyzeSuccess] = useState(false);

	const { setAnalytics, resetAnalytics } = useAnalyticsStore();

	const { getAnalytics, isLoading, error, clearErrors } = useGetAnalytics();

	const onFileSelected = (file: File) => {
		setSelectedFile(file);
		setIsAnalyzeSuccess(false);
		clearErrors();
	};

	const onFileRemove = useCallback(() => {
		setSelectedFile(undefined);
		setIsAnalyzeSuccess(false);

		resetAnalytics();
		clearErrors();
	}, [resetAnalytics]);

	// TODO: запрос продолжает идти при смене вкладки, юзнуть аборт контроллер?
	useEffect(() => {
		return () => {
			onFileRemove();
		};
	}, [onFileRemove]);

	const handleAnalyzeFile = () => {
		if (!selectedFile) {
			return;
		}

		const historyData = {
			date: new Date(),
			fileName: selectedFile.name,
		};

		getAnalytics({ rows: 100000, file: selectedFile, onAnalyticSlice: setAnalytics })
			.then((result) => {
				historyAnalyzeController.addHistory({
					status: 'success',
					data: result,
					...historyData,
				});

				setIsAnalyzeSuccess(true);
			})
			.catch(() => {
				historyAnalyzeController.addHistory({ status: 'error', ...historyData });
				setIsAnalyzeSuccess(false);
			});
	};

	return (
		<div className={styles.analyze}>
			<div className={styles.label}>
				Загрузите <span className={styles.boldText}>csv</span> файл и получите
				<span className={styles.boldText}> полную информацию</span> о нём за сверхнизкое
				время
			</div>

			<LoadZone
				onFileSelected={onFileSelected}
				onFileRemove={onFileRemove}
				fileName={selectedFile?.name}
				isLoading={isLoading}
				isSuccess={isAnalyzeSuccess}
				error={error}
			/>

			{!isAnalyzeSuccess && !error && (
				<Button disabled={!selectedFile} onClick={handleAnalyzeFile}>
					Отправить
				</Button>
			)}
		</div>
	);
};

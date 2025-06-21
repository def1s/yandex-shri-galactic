import { useState } from 'react';
import { historyAnalyzeController, HistoryAnalyze } from '@/entities';
import { Button } from '@/shared';
import { useNavigate } from 'react-router';
import type { Path } from '@/app';

import styles from './History.module.css';

export const HistoryPage = () => {
	const localstorageHistory = historyAnalyzeController.getHistory();
	const [history, setHistory] = useState(localstorageHistory);

	const navigate = useNavigate();

	const handleRemoveHistory = () => {
		historyAnalyzeController.clearHistory();
		setHistory([]);
	};

	const handleGenerateMore = () => {
		const path: Path = '/generator';
		navigate(path);
	};

	return (
		<div className={styles.history}>
			<HistoryAnalyze.List history={history} />

			<div className={styles.actions}>
				<Button onClick={handleGenerateMore} theme={'green'}>
					Сгенерировать больше
				</Button>

				<Button onClick={handleRemoveHistory}>Очистить все</Button>
			</div>
		</div>
	);
};

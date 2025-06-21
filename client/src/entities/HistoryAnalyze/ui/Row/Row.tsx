import { useState } from 'react';

import type { HistoryItem } from '../../model/types';
import { AnalyticModal } from '../AnalyticModal/AnalyticModal';

import styles from './Row.module.css';
import { classNames } from '@/shared';

type Props = HistoryItem;

const formatDate = (date: Date) => {
	return date.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
};

export const Row = (props: Props) => {
	const { status, date, fileName, data } = props;

	const [isAnalyticModalOpen, setIsAnalyticModalOpen] = useState(false);

	const handleToggleAnalyticModal = () => {
		if (status !== 'success') {
			return;
		}

		setIsAnalyticModalOpen((prev) => !prev);
	};

	if (!data) {
		return null;
	}

	return (
		<div className={styles.row}>
			<div className={styles.record} onClick={handleToggleAnalyticModal}>
				<label className={styles.text}>{fileName}</label>

				<div className={styles.text}>{formatDate(date)}</div>

				<div className={classNames(styles.text, status === 'error' && styles.disabled)}>
					Обработан успешно
				</div>

				<div className={classNames(styles.text, status === 'success' && styles.disabled)}>
					Не удалось обработать
				</div>
			</div>

			{isAnalyticModalOpen && (
				<AnalyticModal
					isOpen={isAnalyticModalOpen}
					onClose={handleToggleAnalyticModal}
					data={data}
				/>
			)}
		</div>
	);
};

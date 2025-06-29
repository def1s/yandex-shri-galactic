import { useState } from 'react';

import type { HistoryItem } from '../../model/types';
import { AnalyticModal } from '../AnalyticModal/AnalyticModal';

import HappySmileIcon from '@/shared/assets/happy_smile.svg';
import SadSmileIcon from '@/shared/assets/sad_smile.svg';
import TrashIcon from '@/shared/assets/trash.svg';

import styles from './Row.module.css';
import { classNames } from '@/shared';

type Props = HistoryItem & {
	onRemoveItem: (id: HistoryItem['id']) => void;
};

const formatDate = (date: Date) => {
	return date.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
};

export const Row = (props: Props) => {
	const { status, date, fileName, data, id, onRemoveItem } = props;

	const [isAnalyticModalOpen, setIsAnalyticModalOpen] = useState(false);

	const handleToggleAnalyticModal = () => {
		if (status !== 'success') {
			return;
		}

		setIsAnalyticModalOpen((prev) => !prev);
	};

	if (!data && status !== 'error') {
		return null;
	}

	return (
		<div className={styles.row}>
			<div className={styles.record} onClick={handleToggleAnalyticModal}>
				<label className={styles.text}>{fileName}</label>

				<div className={styles.text}>{formatDate(date)}</div>

				<div
					className={classNames(
						styles.text,
						styles.status,
						status === 'error' && styles.disabled,
					)}
				>
					<div>Обработан успешно</div>
					<HappySmileIcon className={classNames(status === 'error' && styles.disabled)} />
				</div>

				<div
					className={classNames(
						styles.text,
						styles.status,
						status === 'success' && styles.disabled,
					)}
				>
					<div>Не удалось обработать</div>
					<SadSmileIcon className={classNames(status === 'success' && styles.disabled)} />
				</div>
			</div>

			<div
				className={styles.removeBtn}
				onClick={() => onRemoveItem(id)}
				data-testid={'remove-history-item'}
			>
				<TrashIcon />
			</div>

			{isAnalyticModalOpen && data && (
				<AnalyticModal
					isOpen={isAnalyticModalOpen}
					onClose={handleToggleAnalyticModal}
					data={data}
				/>
			)}
		</div>
	);
};

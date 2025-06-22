import { ANALYTICS_LABELS, Card, formatDayOfYear, Modal, ORDERED_ANALYTIC_FIELDS } from '@/shared';
import type { IAnalytics } from '@/entities';

import styles from './AnalyticModal.module.css';

type Props = {
	isOpen: boolean;
	onClose: () => void;

	data: IAnalytics;
};

export const AnalyticModal = (props: Props) => {
	const { isOpen, onClose, data } = props;

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className={styles.cards}>
				{ORDERED_ANALYTIC_FIELDS.map((field) => {
					const value = data[field];
					if (value === undefined) return null;

					const label = ANALYTICS_LABELS[field];
					if (!label) return null;

					const isDayOfYearField = field === 'less_spent_at' || field === 'big_spent_at';
					const displayValue = isDayOfYearField
						? formatDayOfYear(value as number)
						: value;

					return (
						<Card
							key={field}
							label={label}
							value={displayValue}
							className={styles.card}
						/>
					);
				})}
			</div>
		</Modal>
	);
};

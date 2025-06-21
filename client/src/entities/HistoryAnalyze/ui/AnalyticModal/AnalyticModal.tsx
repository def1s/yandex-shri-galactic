import { ANALYTICS_LABELS, Card, Modal, ORDERED_ANALYTIC_FIELDS } from '@/shared';
import type { IAnalytics } from '@/entities';

type Props = {
	isOpen: boolean;
	onClose: () => void;

	data: IAnalytics;
};

export const AnalyticModal = (props: Props) => {
	const { isOpen, onClose, data } = props;

	return (
		// TODO: дублируется отрисовка логики аналитики
		<Modal isOpen={isOpen} onClose={onClose}>
			{ORDERED_ANALYTIC_FIELDS.map((field) => {
				const value = data[field];

				if (value === undefined) {
					return null;
				}

				const label = ANALYTICS_LABELS[field];

				if (!label) {
					return null;
				}

				return <Card key={field} label={label} value={value} />;
			})}
		</Modal>
	);
};

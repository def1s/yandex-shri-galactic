import styles from './Card.module.css';
import { classNames } from '@/shared';

type Props = {
	label: string;
	value: string | number;

	className?: string;
};

export const Card = (props: Props) => {
	const { label, value, className } = props;

	return (
		<div className={classNames(styles.card, className)}>
			<div className={styles.value}>
				{typeof value === 'number' ? Math.floor(value) : value}
			</div>
			<div className={styles.label}>{label}</div>
		</div>
	);
};

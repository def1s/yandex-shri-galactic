import styles from './CancelButton.module.css';
import { classNames } from '@/shared';

type Props = {
	onClick: () => void;
	className?: string;
};

export const CancelButton = (props: Props) => {
	const { onClick, className } = props;

	return (
		<div
			className={classNames(styles.cross, className)}
			data-testid={'remove-button'}
			onClick={onClick}
		></div>
	);
};

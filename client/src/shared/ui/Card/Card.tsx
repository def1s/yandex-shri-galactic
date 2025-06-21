import styles from './Card.module.css';

type Props = {
	label: string;
	value: string | number;
};

export const Card = (props: Props) => {
	const { label, value } = props;

	return (
		<div className={styles.card}>
			<div>{value}</div>
			<div>{label}</div>
		</div>
	);
};

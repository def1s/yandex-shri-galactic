import type { HistoryItem } from '../../model/types';
import { Row } from '../Row/Row';

import styles from './List.module.css';

type Props = {
	history: HistoryItem[];

	onRemoveItem: (id: HistoryItem['id']) => void;
};

export const List = (props: Props) => {
	const { history, onRemoveItem } = props;

	return (
		<div className={styles.list}>
			{history.map((item, index) => (
				<Row key={index} {...item} onRemoveItem={onRemoveItem} />
			))}
		</div>
	);
};

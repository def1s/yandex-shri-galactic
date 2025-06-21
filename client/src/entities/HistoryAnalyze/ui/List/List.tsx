import type { HistoryItem } from '../../model/types';
import { Row } from '../Row/Row';

import styles from './List.module.css';

type Props = {
	history: HistoryItem[];
};

export const List = (props: Props) => {
	const { history } = props;

	return (
		<div className={styles.list}>
			{history.map((item, index) => (
				<Row key={index} {...item} />
			))}
		</div>
	);
};

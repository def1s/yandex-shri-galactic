import type { MouseEvent, ReactNode } from 'react';
import styles from './Modal.module.css';

import { CancelButton, classNames, Portal } from '@/shared';

type Props = {
	children: ReactNode;

	onClose: () => void;
	isOpen: boolean;

	element?: HTMLElement;

	className?: string;
};

export const Modal = (props: Props) => {
	const { className, children, onClose, isOpen, element } = props;

	const onClickContent = (e: MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<Portal element={element}>
			<div className={classNames(styles.modal, isOpen && styles.isOpen, className)}>
				<div className={styles.overlay} onClick={onClose}>
					<div className={styles.content} onClick={(e) => onClickContent(e)}>
						<CancelButton onClick={onClose} className={styles.cross} />

						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
};

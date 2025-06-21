import styles from './Button.module.css';
import { ButtonHTMLAttributes } from 'react';
import { classNames } from '@/shared';

import SpinnerIcon from '@/shared/assets/spinner.svg';

type Theme = 'default' | 'green' | 'yellow';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	theme?: Theme;

	isLoading?: boolean;
};

export const Button = (props: Props) => {
	const { children, theme = 'default', isLoading = false, ...restProps } = props;

	return (
		<button
			className={classNames(styles.button, styles[theme], isLoading && styles.loading)}
			{...restProps}
		>
			{isLoading ? <SpinnerIcon className={styles.spinner} /> : children}
		</button>
	);
};

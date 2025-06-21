import { useState } from 'react';
import type { IAnalytics } from '@/entities';
import type { Undefinable } from '@/shared';

type Props = {
	rows: number;
	file: File;
	onAnalyticSlice: (analytics: IAnalytics) => void;
};

type Result = Undefinable<IAnalytics>;

export const useGetAnalytics = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const clearErrors = () => {
		setError(null);
	};

	const getAnalytics = async (props: Props): Promise<Result> => {
		const { rows, file, onAnalyticSlice } = props;

		const formData = new FormData();
		formData.append('file', file);

		setIsLoading(true);
		setError(null);

		let lastSlice: Result;

		try {
			const response = await fetch(`${__API_URL__}/aggregate?rows=${rows}`, {
				method: 'POST',
				body: formData,
			});

			if (!response.ok || !response.body) {
				throw new Error('Ошибка при получении аналитики');
			}

			const reader = response.body.getReader();
			const decoder = new TextDecoder();

			let buffer = '';

			while (true) {
				const { value, done } = await reader.read();

				if (done) {
					break;
				}

				buffer += decoder.decode(value, { stream: true });

				let newlineIndex;

				while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
					const line = buffer.slice(0, newlineIndex).trim();
					buffer = buffer.slice(newlineIndex + 1);

					if (!line) {
						continue;
					}

					try {
						const analytics = JSON.parse(line) as IAnalytics;
						onAnalyticSlice(analytics);

						lastSlice = analytics;
					} catch (err) {
						console.error('Ошибка парсинга JSON:', err, line);
					}
				}
			}

			// возможный остаток
			if (buffer.trim()) {
				try {
					const analytics = JSON.parse(buffer.trim()) as IAnalytics;
					onAnalyticSlice(analytics);

					lastSlice = analytics;
				} catch (err) {
					console.error('Ошибка парсинга остатка:', err, buffer);
				}
			}
		} catch (err) {
			console.error(err);

			setError('Ошибка при анализе файла');
		} finally {
			setIsLoading(false);
		}

		return lastSlice;
	};

	return {
		isLoading,
		error,
		getAnalytics,
		clearErrors,
	};
};

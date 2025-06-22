import { useState } from 'react';

type WithErrors = 'on' | 'off';

type Props = {
	size: number;

	withErrors?: WithErrors;
	maxSpend?: number;
};

type Return = {
	/** сгенерирован для доступа к файлу */
	url: string | null;
};

export const useGetGeneratedCsv = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const clearErrors = () => {
		setError(null);
	};

	const generateCsv = async (props: Props): Promise<Return> => {
		const { size, withErrors = 'off', maxSpend = 1000 } = props;

		try {
			setIsLoading(true);
			setError(null);

			const result = await fetch(
				`${__API_URL__}/report?size=${size}&withErrors=${withErrors}&maxSpend=${maxSpend}`,
				{
					method: 'GET',
				},
			);

			if (!result.ok) {
				throw new Error('Ошибка генерации csv');
			}

			const blob = await result.blob();
			const url = URL.createObjectURL(blob);

			return {
				url,
			};
		} catch (error) {
			setError('Ошибка генерации csv');
		} finally {
			setIsLoading(false);
		}

		return {
			url: null,
		};
	};

	return { isLoading, error, generateCsv, clearErrors };
};

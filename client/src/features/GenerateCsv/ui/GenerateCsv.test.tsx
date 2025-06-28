import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';

import { useGetGeneratedCsv } from '../api/useGetGeneratedCsv';
import { downloadFromUrl } from '../lib/downloadFromUrl';

import { GenerateCsv } from './GenerateCsv';

vi.mock('../lib/downloadFromUrl', () => ({
	downloadFromUrl: vi.fn(),
}));

vi.mock('../api/useGetGeneratedCsv', () => ({
	useGetGeneratedCsv: vi.fn(),
}));

const mockedGenerateCsv = vi.fn().mockResolvedValue({ url: 'https://test-url.com/file.csv' });
const mockedClearErrors = vi.fn();

describe('GenerateCsv', () => {
	const defaultGetGeneratedCsv = {
		generateCsv: mockedGenerateCsv,
		clearErrors: mockedClearErrors,
		isLoading: false,
		error: '',
	};

	beforeEach(() => {
		vi.clearAllMocks();

		vi.mocked(useGetGeneratedCsv).mockReturnValue(defaultGetGeneratedCsv);
	});

	it('renders button initially', () => {
		render(<GenerateCsv />);
		expect(screen.getByRole('button', { name: /Начать генерацию/i })).toBeInTheDocument();
	});

	it('should calls generateCsv and downloads file and show success message', async () => {
		render(<GenerateCsv />);
		fireEvent.click(screen.getByRole('button', { name: /Начать генерацию/i }));

		await waitFor(() => {
			expect(mockedGenerateCsv).toHaveBeenCalled();
			expect(downloadFromUrl).toHaveBeenCalledWith('https://test-url.com/file.csv');
		});

		const successGeneratingMessage = screen.getByText('файл сгенерирован!');
		expect(successGeneratingMessage).toBeInTheDocument();
	});

	it('should show loading message while generating csv', () => {
		vi.mocked(useGetGeneratedCsv).mockReturnValue({
			...defaultGetGeneratedCsv,
			isLoading: true,
		});

		render(<GenerateCsv />);

		const loadingMessage = screen.getByText('идет процесс генерации');
		expect(loadingMessage).toBeInTheDocument();
	});

	it('should show error message on generateCsv error and should not show other success messages', () => {
		vi.mocked(useGetGeneratedCsv).mockReturnValue({
			...defaultGetGeneratedCsv,
			error: 'Error message',
		});

		render(<GenerateCsv />);

		const buttonWithError = screen.getByRole('button', { name: 'Ошибка' });
		expect(buttonWithError).toBeInTheDocument();

		const loadingMessage = screen.queryByText('идет процесс генерации');
		expect(loadingMessage).not.toBeInTheDocument();

		const successGeneratingMessage = screen.queryByText('файл сгенерирован!');
		expect(successGeneratingMessage).not.toBeInTheDocument();

		const errorMessage = screen.getByText('Error message');
		expect(errorMessage).toBeInTheDocument();
	});
});

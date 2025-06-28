import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, vi } from 'vitest';

import { useGetAnalytics } from '../api/useGetAnalytics';
import { AnalyzeCsvFile } from './AnalyzeCsvFile';
import { historyAnalyzeController } from '@/entities';

import '@testing-library/jest-dom';

vi.mock('../api/useGetAnalytics', () => ({
	useGetAnalytics: vi.fn(),
}));

vi.mock('@/entities', () => ({
	useAnalyticsStore: () => ({
		setAnalytics: vi.fn(),
		resetAnalytics: vi.fn(),
	}),

	historyAnalyzeController: {
		addHistory: vi.fn(),
		getHistory: vi.fn().mockReturnValue([]),
		clearHistory: vi.fn(),
		setHistory: vi.fn(),
		deleteHistoryItem: vi.fn(),
	},
}));

const mockedAnalytic = {
	total_spend_galactic: 1,
	rows_affected: 2,
	less_spent_at: 3,
	big_spent_at: 4,
	less_spent_value: 5,
	big_spent_value: 6,
	average_spend_galactic: 7,
	big_spent_civ: 'humans',
	less_spent_civ: 'monsters',
};

describe('AnalyzeCsvFile', () => {
	const mockedGetAnalytics = vi.fn().mockResolvedValue(mockedAnalytic);
	const mockedClearErrors = vi.fn();

	const addHistoryMock = vi.fn();

	const defaultGetAnalyticsMock = {
		getAnalytics: mockedGetAnalytics,
		clearErrors: mockedClearErrors,
		isLoading: false,
		error: '',
	};

	beforeEach(() => {
		vi.clearAllMocks();
		vi.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));

		vi.mocked(historyAnalyzeController.addHistory).mockImplementation(addHistoryMock);
		vi.spyOn(Math, 'random').mockReturnValue(0);

		vi.mocked(useGetAnalytics).mockReturnValue(defaultGetAnalyticsMock);
	});

	it('should render with disabled button initially', () => {
		render(<AnalyzeCsvFile />);

		const button = screen.getByRole('button', { name: /Отправить/i });
		expect(button).toBeDisabled();
	});

	it('should enable button after file selected and calls getAnalytics on submit', async () => {
		render(<AnalyzeCsvFile />);

		const file = new File(['test content'], 'test.csv', { type: 'text/csv' });
		const input = screen.getByTestId('file-input') as HTMLInputElement;
		fireEvent.change(input, { target: { files: [file] } });

		const submitButton = screen.getByRole('button', { name: /Отправить/i });

		expect(submitButton).toBeEnabled();
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(mockedGetAnalytics).toHaveBeenCalled();
		});

		await waitFor(() => {
			expect(screen.getByText(/готово!/i)).toBeInTheDocument();
		});

		expect(addHistoryMock).toHaveBeenCalledWith({
			id: 0,
			date: new Date(),
			fileName: file.name,
			status: 'success',
			data: mockedAnalytic,
		});

		expect(submitButton).not.toBeInTheDocument();
	});

	it('should show error on called and rejected getAnalytics', async () => {
		const mockedGetAnalyticsError = vi.fn().mockRejectedValue('Get error');

		vi.mocked(useGetAnalytics).mockReturnValue({
			...defaultGetAnalyticsMock,
			getAnalytics: mockedGetAnalyticsError,
		});

		render(<AnalyzeCsvFile />);

		const file = new File(['test content'], 'test.csv', { type: 'text/csv' });
		const input = screen.getByTestId('file-input') as HTMLInputElement;

		fireEvent.change(input, { target: { files: [file] } });

		const submitButton = screen.getByRole('button', { name: /Отправить/i });

		expect(submitButton).toBeEnabled();
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(mockedGetAnalyticsError).toHaveBeenCalled();
			expect(screen.queryByText(/готово!/i)).not.toBeInTheDocument();

			expect(addHistoryMock).toHaveBeenCalledWith({
				id: 0,
				date: new Date(),
				fileName: file.name,
				status: 'error',
			});
		});
	});

	it('should correctly show error message', async () => {
		vi.mocked(useGetAnalytics).mockReturnValue({
			...defaultGetAnalyticsMock,
			error: 'Error',
		});

		render(<AnalyzeCsvFile />);

		const file = new File(['test content'], 'fail.csv', { type: 'text/csv' });
		const input = screen.getByTestId('file-input') as HTMLInputElement;
		fireEvent.change(input, { target: { files: [file] } });

		const button = screen.queryByRole('button', { name: /Отправить/i });
		expect(button).not.toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByText(/Error/i)).toBeInTheDocument();
		});
	});

	it('should not call analyze file without selected file', () => {
		render(<AnalyzeCsvFile />);

		const button = screen.getByRole('button', { name: /Отправить/i });
		fireEvent.click(button);

		expect(mockedGetAnalytics).not.toHaveBeenCalled();
	});
});

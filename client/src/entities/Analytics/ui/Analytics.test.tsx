import { expect, vi } from 'vitest';
import { Analytics } from './Analytics';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { ANALYTICS_LABELS, ORDERED_ANALYTIC_FIELDS, formatDayOfYear } from '@/shared';

import { useAnalyticsStore } from '../model/useAnalyticsStore';

vi.mock('../model/useAnalyticsStore', () => ({
	useAnalyticsStore: vi.fn(),
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

describe('Analytics', () => {
	const mockedResetAnalytics = vi.fn();
	const mockedSetAnalytics = vi.fn();

	const mockedUseAnalyticsStore = {
		analytics: undefined,
		resetAnalytics: mockedResetAnalytics,
		setAnalytics: mockedSetAnalytics,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should correctly render helper text with empty analytics and should not show analytic fields', () => {
		vi.mocked(useAnalyticsStore).mockReturnValue(mockedUseAnalyticsStore);

		render(<Analytics />);

		expect(screen.getByText('Здесь')).toBeInTheDocument();
		expect(screen.getByText('появятся хайлайты')).toBeInTheDocument();

		for (const label of Object.values(ANALYTICS_LABELS)) {
			expect(screen.queryByText(label)).not.toBeInTheDocument();
		}
	});

	it('should correctly render analytic fields', () => {
		vi.mocked(useAnalyticsStore).mockReturnValue({
			...mockedUseAnalyticsStore,
			analytics: mockedAnalytic,
		});

		render(<Analytics />);

		expect(screen.queryByText('Здесь')).not.toBeInTheDocument();
		expect(screen.queryByText('появятся хайлайты')).not.toBeInTheDocument();

		for (const field of ORDERED_ANALYTIC_FIELDS) {
			const label = ANALYTICS_LABELS[field];
			if (!label) continue;

			expect(screen.getByText(label)).toBeInTheDocument();

			const value = mockedAnalytic[field];

			if (value === undefined) continue;

			const isDayOfYearField = field === 'less_spent_at' || field === 'big_spent_at';
			const displayValue = isDayOfYearField
				? formatDayOfYear(value as number)
				: String(value);

			expect(screen.getByText(displayValue)).toBeInTheDocument();
		}
	});

	it('should call resetAnalytics on unmount', () => {
		vi.mocked(useAnalyticsStore).mockReturnValue({
			...mockedUseAnalyticsStore,
			analytics: mockedAnalytic,
		});

		const { unmount } = render(<Analytics />);
		unmount();

		expect(mockedResetAnalytics).toHaveBeenCalled();
	});
});

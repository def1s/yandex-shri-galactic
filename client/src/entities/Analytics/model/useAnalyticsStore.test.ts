import { useAnalyticsStore } from './useAnalyticsStore';
import type { IAnalytics } from './types';

describe('useAnalyticsStore', () => {
	afterEach(() => {
		useAnalyticsStore.getState().resetAnalytics();
	});

	const sampleAnalytics: IAnalytics = {
		total_spend_galactic: 100,
		rows_affected: 10,
		less_spent_at: 5,
		big_spent_at: 20,
		less_spent_value: 50,
		big_spent_value: 200,
		average_spend_galactic: 75,
		big_spent_civ: 'humans',
		less_spent_civ: 'monsters',
	};

	it('initial state is undefined', () => {
		const analytics = useAnalyticsStore.getState().analytics;
		expect(analytics).toBeUndefined();
	});

	it('sets analytics correctly', () => {
		useAnalyticsStore.getState().setAnalytics(sampleAnalytics);

		const analytics = useAnalyticsStore.getState().analytics;
		expect(analytics).toEqual(sampleAnalytics);
	});

	it('resets analytics to undefined', () => {
		useAnalyticsStore.getState().setAnalytics(sampleAnalytics);
		useAnalyticsStore.getState().resetAnalytics();

		const analytics = useAnalyticsStore.getState().analytics;
		expect(analytics).toBeUndefined();
	});
});

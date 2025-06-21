import { create } from 'zustand';
import type { IAnalytics } from './types';

interface AnalyticsStore {
	/** Поля */
	analytics?: IAnalytics;

	/** Методы */
	setAnalytics(analytics: IAnalytics): void;
	resetAnalytics(): void;
}

export const useAnalyticsStore = create<AnalyticsStore>((set, get) => ({
	setAnalytics(analytics: IAnalytics) {
		set({ analytics });
	},

	resetAnalytics() {
		set({ analytics: undefined });
	},
}));

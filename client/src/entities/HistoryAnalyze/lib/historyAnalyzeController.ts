import type { IAnalytics, AnalyticFields } from '@/entities';

import { HISTORY_ANALYZE_LOCALSTORAGE_KEY } from '../model/const';
import type { HistoryItem } from '../model/types';

const analyticsFields: AnalyticFields[] = [
	'total_spend_galactic',
	'less_spent_civ',
	'rows_affected',
	'big_spent_at',
	'less_spent_at',
	'big_spent_value',
	'big_spent_civ',
	'average_spend_galactic',
	'less_spent_value',
];

export class HistoryAnalyzeController {
	private validateParsedHistoryItem(data?: IAnalytics) {
		if (!data) {
			return false;
		}

		for (const field in data) {
			if (!analyticsFields.includes(field as AnalyticFields)) {
				return false;
			}
		}

		return true;
	}

	getHistory() {
		try {
			const history = localStorage.getItem(HISTORY_ANALYZE_LOCALSTORAGE_KEY);

			if (!history) {
				return [];
			}

			const parsedHistory = JSON.parse(history) as HistoryItem[];
			const filteredHistory = parsedHistory.filter((item) =>
				this.validateParsedHistoryItem(item.data),
			);

			return filteredHistory.map((item) => ({
				...item,
				date: new Date(item.date),
			}));
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	addHistory(item: HistoryItem) {
		const history = this.getHistory();

		history.push(item);
		const stringifyHistory = JSON.stringify(history);

		localStorage.setItem(HISTORY_ANALYZE_LOCALSTORAGE_KEY, stringifyHistory);
	}

	clearHistory() {
		localStorage.removeItem(HISTORY_ANALYZE_LOCALSTORAGE_KEY);
	}

	setHistory(history: HistoryItem[]) {
		this.clearHistory();

		const stringifyHistory = JSON.stringify(history);

		localStorage.setItem(HISTORY_ANALYZE_LOCALSTORAGE_KEY, stringifyHistory);
	}

	deleteHistoryItem(id: HistoryItem['id']) {
		const history = this.getHistory();
		const filteredHistory = history.filter((item) => item.id !== id);

		this.setHistory(filteredHistory);
	}
}

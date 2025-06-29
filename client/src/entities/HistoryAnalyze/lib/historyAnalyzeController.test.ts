import { HISTORY_ANALYZE_LOCALSTORAGE_KEY } from '../model/const';
import { HistoryAnalyzeController } from './historyAnalyzeController';

describe('HistoryAnalyzeController', () => {
	let controller: HistoryAnalyzeController;

	beforeEach(() => {
		controller = new HistoryAnalyzeController();

		localStorage.clear();
		vi.clearAllMocks();
	});

	describe('validateParsedHistoryItem', () => {
		it('should return false if data has unknown fields', () => {
			const invalidData = { unknown_field: 123 };
			expect(controller['validateParsedHistoryItem'](invalidData as any)).toBe(false);
		});

		it('should return true if data has only known analytic fields', () => {
			const validData = {
				total_spend_galactic: 10,
				rows_affected: 5,
			};
			expect(controller['validateParsedHistoryItem'](validData as any)).toBe(true);
		});
	});

	describe('getHistory', () => {
		it('should return empty array if localStorage is empty', () => {
			localStorage.removeItem(HISTORY_ANALYZE_LOCALSTORAGE_KEY);
			expect(controller.getHistory()).toEqual([]);
		});

		it('should return empty array if localStorage contains invalid JSON', () => {
			localStorage.setItem(HISTORY_ANALYZE_LOCALSTORAGE_KEY, 'invalid json');
			expect(controller.getHistory()).toEqual([]);
		});

		it('should filter out invalid history items and parse dates correctly', () => {
			const history = [
				{ id: 1, date: '2023-01-01T00:00:00Z', data: { total_spend_galactic: 100 } }, // valid
				{ id: 2, date: '2023-01-02T00:00:00Z', data: { invalid: true } }, // invalid
			];
			localStorage.setItem(HISTORY_ANALYZE_LOCALSTORAGE_KEY, JSON.stringify(history));

			const result = controller.getHistory();

			expect(result.length).toBe(1);
			expect(result[0].id).toBe(1);
			expect(result[0].date).toBeInstanceOf(Date);
			expect(result[0].data).toEqual({ total_spend_galactic: 100 });
		});
	});

	describe('addHistory', () => {
		it('should add item to localStorage', () => {
			const item = { id: 1, date: new Date(), data: { total_spend_galactic: 50 } };
			controller.addHistory(item as any);

			const stored = JSON.parse(
				localStorage.getItem(HISTORY_ANALYZE_LOCALSTORAGE_KEY) || '[]',
			);
			expect(stored).toHaveLength(1);
			expect(stored[0].id).toBe(item.id);
		});

		it('should append item to existing history', () => {
			const existingItem = {
				id: 1,
				date: new Date().toISOString(),
				data: { total_spend_galactic: 30 },
			};
			localStorage.setItem(HISTORY_ANALYZE_LOCALSTORAGE_KEY, JSON.stringify([existingItem]));

			const newItem = { id: '2', date: new Date(), data: { total_spend_galactic: 50 } };
			controller.addHistory(newItem as any);

			const stored = JSON.parse(
				localStorage.getItem(HISTORY_ANALYZE_LOCALSTORAGE_KEY) || '[]',
			);
			expect(stored).toHaveLength(2);
			expect(stored[1].id).toBe(newItem.id);
		});
	});

	describe('clearHistory', () => {
		it('should remove history from localStorage', () => {
			localStorage.setItem(HISTORY_ANALYZE_LOCALSTORAGE_KEY, 'some data');
			controller.clearHistory();
			expect(localStorage.getItem(HISTORY_ANALYZE_LOCALSTORAGE_KEY)).toBeNull();
		});
	});

	describe('setHistory', () => {
		it('should replace existing history in localStorage', () => {
			const items = [
				{ id: 1, date: new Date(), data: { total_spend_galactic: 10 } },
				{ id: 2, date: new Date(), data: { rows_affected: 5 } },
			];
			controller.setHistory(items as any);

			const stored = JSON.parse(
				localStorage.getItem(HISTORY_ANALYZE_LOCALSTORAGE_KEY) || '[]',
			);
			expect(stored).toHaveLength(2);
			expect(stored[0].id).toBe(1);
			expect(stored[1].id).toBe(2);
		});
	});

	describe('deleteHistoryItem', () => {
		it('should remove item by id from localStorage', () => {
			const items = [
				{ id: 1, date: new Date().toISOString(), data: { total_spend_galactic: 10 } },
				{ id: 2, date: new Date().toISOString(), data: { rows_affected: 5 } },
			];
			localStorage.setItem(HISTORY_ANALYZE_LOCALSTORAGE_KEY, JSON.stringify(items));

			controller.deleteHistoryItem(1);

			const stored = JSON.parse(
				localStorage.getItem(HISTORY_ANALYZE_LOCALSTORAGE_KEY) || '[]',
			);
			expect(stored).toHaveLength(1);
			expect(stored[0].id).toBe(2);
		});
	});
});

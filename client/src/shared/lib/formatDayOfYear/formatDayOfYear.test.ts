import { describe, it, expect, vi } from 'vitest';
import { formatDayOfYear } from './formatDayOfYear';

describe('formatDayOfYear', () => {
	beforeAll(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it('formats the first day of the year', () => {
		expect(formatDayOfYear(1)).toBe('1 января');
	});

	it('formats the 32nd day of the year as 1 февраля', () => {
		expect(formatDayOfYear(32)).toBe('1 февраля');
	});

	it('formats the 60th day (leap year) as 29 февраля', () => {
		expect(formatDayOfYear(60)).toBe('29 февраля');
	});

	it('formats the 365th day of the year', () => {
		expect(formatDayOfYear(365)).toBe('30 декабря');
	});

	it('formats the 366th day of the leap year', () => {
		expect(formatDayOfYear(366)).toBe('31 декабря');
	});
});

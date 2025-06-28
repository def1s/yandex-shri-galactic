import { describe, it, expect } from 'vitest';
import { classNames } from './classNames';

describe('classNames', () => {
	it('returns empty string if called without arguments', () => {
		expect(classNames()).toBe('');
	});

	it('returns only truthy string arguments', () => {
		expect(classNames('foo', undefined, null, false, 'bar')).toBe('foo bar');
	});

	it('converts boolean true to string "true"', () => {
		expect(classNames('foo', true, 'bar')).toBe('foo true bar');
	});

	it('filters out falsy values like false, undefined, null, ""', () => {
		expect(classNames('', false, undefined, null, 'valid')).toBe('valid');
	});

	it('works with single argument', () => {
		expect(classNames('single')).toBe('single');
	});

	it('handles mixed types and trims correctly', () => {
		expect(classNames('foo', true, false, null, 'bar')).toBe('foo true bar');
	});
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import '@testing-library/jest-dom';

import { Card } from './Card';

describe('Card', () => {
	it('renders label and string value correctly', () => {
		render(<Card label="Test Label" value="Test Value" />);

		expect(screen.getByText('Test Label')).toBeInTheDocument();
		expect(screen.getByText('Test Value')).toBeInTheDocument();
	});

	it('renders number value with Math.floor applied', () => {
		render(<Card label="Number Label" value={4.9} />);

		expect(screen.getByText('Number Label')).toBeInTheDocument();
		expect(screen.getByText('4')).toBeInTheDocument();
	});

	it('applies additional className if provided', () => {
		render(<Card label="Label" value="Value" className="extra-class" />);

		const container = screen.getByText('Label').parentElement;
		expect(container).toHaveClass('card');
		expect(container).toHaveClass('extra-class');
	});
});

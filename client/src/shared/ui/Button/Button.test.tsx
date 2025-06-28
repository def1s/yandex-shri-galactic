import { Button } from './Button';
import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

describe('Button', () => {
	it('should render correctly', () => {
		expect(() => render(<Button>Text</Button>)).not.toThrow();

		const button = screen.getByRole('button', { name: /Text/i });
		expect(button).toBeInTheDocument();
	});
});

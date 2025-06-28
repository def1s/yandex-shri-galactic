import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';

import { Row } from './Row';

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

vi.mock('../AnalyticModal/AnalyticModal', () => ({
	AnalyticModal: ({ isOpen }: { isOpen: boolean }) => (isOpen ? <div>Modal Content</div> : null),
}));

describe('Row component', () => {
	const onRemoveItem = vi.fn();

	const baseProps = {
		id: 123,
		fileName: 'test-file.csv',
		date: new Date('2023-06-25T12:00:00Z'),
		status: 'success' as const,
		data: mockedAnalytic,
		onRemoveItem,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders filename and formatted date', () => {
		render(<Row {...baseProps} />);
		expect(screen.getByText(baseProps.fileName)).toBeInTheDocument();

		expect(screen.getByText('25.06.2023')).toBeInTheDocument();
	});

	it('renders both success and error status blocks with correct classes', () => {
		render(<Row {...baseProps} />);

		expect(screen.getByText('Обработан успешно')).toBeVisible();
		expect(screen.getByText('Не удалось обработать')).toBeVisible();
	});

	it('does not render anything if data is undefined', () => {
		const { container } = render(<Row {...baseProps} data={undefined} />);

		expect(container).toBeEmptyDOMElement();
	});

	it('toggles analytic modal only if status is success', () => {
		render(<Row {...baseProps} />);

		const recordDiv = screen.getByText(baseProps.fileName).closest('div')!;
		fireEvent.click(recordDiv);

		expect(screen.getByText('Modal Content')).toBeInTheDocument();

		fireEvent.click(recordDiv);
		expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
	});

	it('does not open analytic modal if status is error', () => {
		render(<Row {...baseProps} status="error" />);

		const recordDiv = screen.getByText(baseProps.fileName).closest('div')!;
		fireEvent.click(recordDiv);

		expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
	});

	it('should correctly remove history item', () => {
		render(<Row {...baseProps} />);

		const removeButton = screen.getByTestId('remove-history-item');
		expect(removeButton).toBeInTheDocument();

		fireEvent.click(removeButton);
		expect(onRemoveItem).toHaveBeenCalledWith(baseProps.id);
	});
});

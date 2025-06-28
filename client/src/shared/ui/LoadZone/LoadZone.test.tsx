import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, expect, vi } from 'vitest';

import { LoadZone } from './LoadZone';

describe('LoadZone', () => {
	const mockedOnFileSelected = vi.fn();
	const mockedOnFileRemove = vi.fn();

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('renders correctly show initially states', () => {
		render(
			<LoadZone onFileSelected={mockedOnFileSelected} onFileRemove={mockedOnFileRemove} />,
		);

		const loadButton = screen.getByRole('button', { name: 'Загрузить файл' });
		expect(loadButton).toBeInTheDocument();

		const helperDragText = screen.getByText('или перетащите сюда');
		expect(helperDragText).toBeInTheDocument();

		const successSelectedText = screen.queryByText('файл загружен!');
		expect(successSelectedText).not.toBeInTheDocument();

		const parsingFileMessage = screen.queryByText('идет парсинг файла');
		expect(parsingFileMessage).not.toBeInTheDocument();

		const readyMessage = screen.queryByText('готово!');
		expect(readyMessage).not.toBeInTheDocument();
	});

	it('should correctly handle on file selected', async () => {
		render(
			<LoadZone onFileSelected={mockedOnFileSelected} onFileRemove={mockedOnFileRemove} />,
		);

		const file = new File(['test content'], 'test.csv', { type: 'text/csv' });
		const input = screen.getByTestId('file-input') as HTMLInputElement;
		fireEvent.change(input, { target: { files: [file] } });

		expect(mockedOnFileSelected).toHaveBeenCalledWith(file);
	});

	it('should correctly show success selected file helper text and selected file name', async () => {
		render(
			<LoadZone
				onFileSelected={mockedOnFileSelected}
				onFileRemove={mockedOnFileRemove}
				fileName={'filename'}
			/>,
		);

		const filename = screen.getByText('filename');
		expect(filename).toBeInTheDocument();

		const loadButton = screen.getByRole('button', { name: 'filename' });
		expect(loadButton).toBeInTheDocument();

		const successSelectedText = screen.getByText('файл загружен!');
		expect(successSelectedText).toBeInTheDocument();
	});

	it('should correctly show loading message and disable load button', async () => {
		render(
			<LoadZone
				onFileSelected={mockedOnFileSelected}
				onFileRemove={mockedOnFileRemove}
				isLoading={true}
			/>,
		);

		const loadButton = screen.getByTestId('file-upload');
		expect(loadButton).toBeDisabled();

		const parsingFileMessage = screen.getByText('идет парсинг файла');
		expect(parsingFileMessage).toBeInTheDocument();
	});

	it('should correctly show error message', () => {
		render(
			<LoadZone
				onFileSelected={mockedOnFileSelected}
				onFileRemove={mockedOnFileRemove}
				error={'Error message'}
			/>,
		);

		const errorMessage = screen.getByText('Error message');
		expect(errorMessage).toBeInTheDocument();
	});

	it('should correctly remove file', async () => {
		render(
			<LoadZone
				onFileSelected={mockedOnFileSelected}
				onFileRemove={mockedOnFileRemove}
				fileName={'filename'}
			/>,
		);

		const removeButton = screen.getByTestId('remove-button');
		expect(removeButton).toBeInTheDocument();

		fireEvent.click(removeButton);

		await waitFor(() => {
			expect(mockedOnFileRemove).toHaveBeenCalled();
		});
	});

	it('should handle drag events', () => {
		render(
			<LoadZone onFileSelected={mockedOnFileSelected} onFileRemove={mockedOnFileRemove} />,
		);

		const container = screen.getByTestId('loadzone-container');

		fireEvent.dragOver(container);
		expect(container).toHaveClass('bgDroppable');

		fireEvent.dragLeave(container);
		expect(container).not.toHaveClass('bgDroppable');

		const file = new File(['data'], 'dragged.csv', { type: 'text/csv' });
		fireEvent.drop(container, { dataTransfer: { files: [file] } });

		expect(mockedOnFileSelected).toHaveBeenCalledWith(file);
	});
});

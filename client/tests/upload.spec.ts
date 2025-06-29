import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('upload csv file', () => {
	test('go to upload page and correctly send file and success get all analytics', async ({
		page,
	}) => {
		// должен перенаправлять на страницу аналитики по-умолчанию
		await page.goto('/');

		const fileInput = page.getByTestId('file-input');
		await fileInput.setInputFiles(path.resolve(__dirname, './fixtures/test.csv'));

		await expect(page.getByText('файл загружен!')).toBeVisible();
		await expect(page.getByText('test.csv')).toBeVisible();

		const sendButton = page.getByRole('button', { name: /Отправить/i });
		await sendButton.click();

		await expect(page.getByText('идет парсинг файла')).toBeVisible({ timeout: 100 });

		const analyticCards = page.locator('[data-testid="card"]');
		await expect(analyticCards).toHaveCount(8);

		await expect(page.getByText('готово!')).toBeVisible();
	});

	test('should correctly show and reset error message on upload', async ({ page }) => {
		// блокирую запросы для симуляции ошибки от сервера
		await page.route('**/aggregate**', (route) => {
			route.fulfill({
				status: 500,
				contentType: 'application/json',
				body: JSON.stringify({ message: 'Internal Server Error' }),
			});
		});

		await page.goto('/');

		const fileInput = page.getByTestId('file-input');
		await fileInput.setInputFiles(path.resolve(__dirname, './fixtures/test.csv'));

		await expect(page.getByText('файл загружен!')).toBeVisible();
		await expect(page.getByText('test.csv')).toBeVisible();

		const sendButton = page.getByRole('button', { name: /Отправить/i });
		await sendButton.click();

		const analyzeError = page.getByText('Ошибка при анализе файла');
		await expect(analyzeError).toBeVisible();

		const removeButton = page.getByTestId('remove-button');
		await removeButton.click();

		await expect(removeButton).not.toBeVisible();
		await expect(analyzeError).not.toBeVisible();

		const analyticCards = page.locator('[data-testid="card"]');
		await expect(analyticCards).toHaveCount(0);
	});
});

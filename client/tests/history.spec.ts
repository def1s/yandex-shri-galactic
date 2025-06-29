import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('history', () => {
	test('successful upload csv file visible in history and on click show modal with analytics', async ({
		page,
	}) => {
		await page.goto('/');
		await page
			.getByTestId('file-input')
			.setInputFiles(path.resolve(__dirname, './fixtures/test.csv'));

		await page.getByRole('button', { name: /Отправить/i }).click();
		await expect(page.getByText(/готово!/i)).toBeVisible();

		await page.getByRole('link', { name: /История/i }).click();
		await expect(page).toHaveURL(/.*history/);

		await expect(page.getByText('test.csv')).toBeVisible();

		// проверка, что открылись все карточки аналитики
		await page.getByText('test.csv').click();
		await expect(page.locator('[data-testid="card"]')).toHaveCount(8);

		// закрытие модального окна аналитики (если это модалка)
		const removeButton = page.getByTestId('remove-button');
		await removeButton.click();

		await expect(page.locator('[data-testid="card"]')).toHaveCount(0);
	});

	test('uploaded with error csv file visible in history and modal window is not showing', async ({
		page,
	}) => {
		// блокирую запросы для симуляции ошибки от сервера
		await page.route('**/aggregate**', (route) => {
			route.fulfill({
				status: 500,
				contentType: 'application/json',
				body: JSON.stringify({ message: 'Internal Server Error' }),
			});
		});

		await page.goto('/');
		await page
			.getByTestId('file-input')
			.setInputFiles(path.resolve(__dirname, './fixtures/test.csv'));

		await page.getByRole('button', { name: /Отправить/i }).click();
		const analyzeError = page.getByText('Ошибка при анализе файла');
		await expect(analyzeError).toBeVisible();

		await page.getByRole('link', { name: /История/i }).click();
		await expect(page).toHaveURL(/.*history/);

		await expect(page.getByText('test.csv')).toBeVisible();

		// модалка не открывается, карточек быть не должно
		await page.getByText('test.csv').click();
		await expect(page.locator('[data-testid="card"]')).toHaveCount(0);
	});
});

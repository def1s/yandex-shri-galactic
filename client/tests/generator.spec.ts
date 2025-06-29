import { test, expect } from '@playwright/test';

test.describe('generate csv file', () => {
	test('go to generator page and generate cvs file, then click on clear button', async ({
		page,
	}) => {
		await page.goto('/');

		const generatorLink = page.getByRole('link', { name: /Генератор/i });
		await generatorLink.click();

		await expect(page).toHaveURL(/.*generator/);

		const generateButton = page.getByRole('button', { name: /Начать генерацию/i });
		await generateButton.click();

		// проверка, что надпись "идет процесс генерации" появилась после нажатия на кнопку
		await expect(page.getByText(/идет процесс генерации/i)).toBeVisible({ timeout: 100 });
		await expect(page.getByRole('button', { name: /Done!/i })).toBeVisible();
		await expect(page.getByText(/файл сгенерирован!/i)).toBeVisible();

		const removeButton = page.getByTestId('remove-button');
		await removeButton.click();

		// проверка, что все надписи для сгенерированного файла после сброса отсутствуют
		await expect(page.getByRole('button', { name: /Done!/i })).not.toBeVisible();
		await expect(page.getByText(/файл сгенерирован!/i)).not.toBeVisible();
		await expect(generateButton).toBeVisible();
	});

	test('catch error from server and show error message, then clear error and show generate button', async ({
		page,
	}) => {
		// блокирую запросы для симуляции ошибки от сервера
		await page.route('**/report**', (route) => {
			route.fulfill({
				status: 500,
				contentType: 'application/json',
				body: JSON.stringify({ message: 'Internal Server Error' }),
			});
		});

		await page.goto('/generator');

		const generateButton = page.getByRole('button', { name: /Начать генерацию/i });
		await generateButton.click();

		await expect(page.getByText(/Ошибка генерации csv/i)).toBeVisible();
		await expect(generateButton).not.toBeVisible();

		const errorButton = page.getByRole('button', { name: /Ошибка/i });
		await expect(errorButton).toBeVisible();

		const removeButton = page.getByTestId('remove-button');
		await removeButton.click();

		await expect(generateButton).toBeVisible();
	});
});

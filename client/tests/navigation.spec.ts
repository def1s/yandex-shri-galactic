import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should navigate to generator page', async ({ page }) => {
		await page.getByRole('link', { name: /Генератор/i }).click();

		await expect(page).toHaveURL(/.*generator/);
	});

	test('should navigate to history page', async ({ page }) => {
		await page.getByRole('link', { name: /История/i }).click();

		await expect(page).toHaveURL(/.*history/);
	});

	test('should navigate back to upload page from generator', async ({ page }) => {
		await page.getByRole('link', { name: /Генератор/i }).click();
		await expect(page).toHaveURL(/.*generator/);

		await page.getByRole('link', { name: /Аналитик/i }).click();
		await expect(page).toHaveURL('/analytics');
	});

	test('should navigate back to upload page from history', async ({ page }) => {
		await page.getByRole('link', { name: /История/i }).click();
		await expect(page).toHaveURL(/.*history/);

		await page.getByRole('link', { name: /Аналитик/i }).click();
		await expect(page).toHaveURL('/analytics');
	});
});

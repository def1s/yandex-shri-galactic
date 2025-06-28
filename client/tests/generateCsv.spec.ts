import { test, expect } from '@playwright/test';

// TODO: remove example
test('generating CSV', async ({ page }) => {
	await page.goto('http://localhost:5173/generator');

	await page.click('text=Начать генерацию');

	await expect(page.locator('text=файл сгенерирован!')).toBeVisible();
});

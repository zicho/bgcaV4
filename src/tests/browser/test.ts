import { expect, test } from '@playwright/test';

// todo: create complete test suite for common use cases

test('index page redirects to login when not authenticated', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveURL(/\/login/);
});

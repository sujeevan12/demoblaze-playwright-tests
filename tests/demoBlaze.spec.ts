import { test, expect } from '@playwright/test';

const url = 'https://www.demoblaze.com/index.html';
test.describe('Demo Blaze test', () => {
	test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await expect(page.getByText('PRODUCT STORE')).toBeVisible();
  });
});

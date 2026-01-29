import { test, expect, Page } from '@playwright/test';

const url = 'https://www.demoblaze.com/index.html';

test.describe('Demo Blaze core user tests', () => {
	test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('Homepage loads and displays products', async ({ page }) => {
    const products = page.locator('.card');

    await expect(page.getByRole('heading', { name: 'PRODUCT STORE' })).toBeVisible();
    await expect(products.first()).toBeVisible();
  });

  test('Navigate to product detail page', async ({ page }) => {
    const {name: productName, price: productPrice} = await getFirstProductDetails(page)
    await clickFirstProduct(page);

    await expect(page.locator('.name')).toHaveText(productName);
    await expect(page.locator('.price-container')).toContainText(productPrice);
  });

  test('Add product to cart', async ({ page }) => {
    const {name: productName} = await getFirstProductDetails(page)
    await clickFirstProduct(page);
    await addProductToCart(page);

    await expect(page.locator('.name')).toHaveText(productName);
  });


  test('Cart displays correct product', async ({ page }) => {
    const {name: productName, price: productPrice} = await getFirstProductDetails(page)
    const productTable = page.locator('#tbodyid');
    await addFirstProductToCart(page);

    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
    await expect(productTable.getByRole('cell', { name: productName })).toBeVisible();
    await expect(productTable.getByRole('cell', { name: productPrice.replace('$', '') })).toBeVisible();
  });

  test('Place order successfully', async ({ page }) => {
    await addFirstProductToCart(page);
    await page.getByRole('button', { name: 'Place Order' }).click();

    await page.fill('#name', 'John Doe');
    await page.fill('#country', 'UK');
    await page.fill('#city', 'London');
    await page.fill('#card', '4111111111111111');
    await page.fill('#month', '12');
    await page.fill('#year', '2026');

    await page.click('text=Purchase');

    await expect(page.locator('.sweet-alert')).toContainText('Thank you for your purchase');

    await page.getByRole('button', { name: 'OK' }).click();

    await expect(page.getByRole('heading', { name: 'PRODUCT STORE' })).toBeVisible();
  });
});

async function getFirstProductDetails(page : Page): Promise<{name: string, price: string}> {
  const name = await page.locator('.card-title a').first().innerText();
  const price = await page.locator('.card-block h5').first().innerText();
  return { name, price };
}

async function clickFirstProduct(page : Page): Promise<void> {
  await page.locator('.card-title a').first().click();
}

async function addProductToCart(page : Page): Promise<void> {
  page.once('dialog', async dialog => {
    await dialog.accept();
  });
  await page.click('text=Add to cart');
}

async function clickCart(page : Page): Promise<void> {
  await page.click('#cartur');
}

async function addFirstProductToCart(page : Page): Promise<void> {
  await clickFirstProduct(page);
  await addProductToCart(page);
  await clickCart(page);
}

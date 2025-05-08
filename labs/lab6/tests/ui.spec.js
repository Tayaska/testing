import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('owlowl@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('link', { name: ' Logout' })).toBeVisible();

});


test('product-cart', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Products' }).click();
  await page.locator('.productinfo > .btn').first().click();
  await expect(page.locator('#cartModal div').filter({ hasText: 'Continue Shopping' }).nth(2)).toBeVisible();

});

test('shop-cart', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Products' }).click();
  await page.locator('.choose > .nav > li > a').first().click();
  await page.locator('#quantity').fill('2');
  await page.getByRole('button', { name: ' Add to cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.getByRole('link', { name: ' Cart' }).click();
  await page.getByRole('cell', { name: '' }).locator('a').click();
  await expect(page.getByText('Cart is empty! Click here to')).toBeVisible();

});

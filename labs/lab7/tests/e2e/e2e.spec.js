
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/');
  await page.getByRole('button', { name: ' Signin' }).click();
  await page.getByRole('textbox', { name: 'Login' }).fill('tajanmisiura@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('owlowl');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Login and/or password are')).toBeVisible();
});

test('login', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/index.html');
  await page.getByRole('button', { name: ' Signin' }).click();
  await page.getByRole('textbox', { name: 'Login' }).fill('username');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.goto('http://zero.webappsecurity.com/index.html');
  await expect(page.getByText('username')).toBeVisible();

});

test('logout', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/index.html');
  await page.getByRole('button', { name: ' Signin' }).click();
  await page.getByRole('textbox', { name: 'Login' }).fill('username');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.goto('http://zero.webappsecurity.com/index.html');
  await page.getByText('username').click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByText('username')).not.toBeVisible();

});

test('feedback', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/feedback.html');
  await page.getByRole('textbox', { name: 'Your Name' }).fill('Vi233445');
  await page.getByRole('textbox', { name: 'Your email address' }).fill('young@gmail.com');
  await page.getByRole('textbox', { name: 'Subject' }).fill('heyyyy');
  await page.getByRole('textbox', { name: 'Type your questions here...' }).fill('It is pretty');
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.url()).toContain("sendFeedback.html");
});

test('should not show tabs when we navigate to feedback tab', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/index.html');
  await page.locator('div').filter({ hasText: /^Feedback$/ }).click();
  await expect(page.locator('#nav')).not.toBeVisible();
});
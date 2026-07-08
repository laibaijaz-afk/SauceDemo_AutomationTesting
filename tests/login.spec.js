const { test, expect } = require('@playwright/test');

// ============================================
// LOGIN TEST SUITE - SauceDemo
// ============================================

test.describe('Login Feature', () => {

  // Test 1: Valid login - Positive test case
  test('Standard user valid credentials se login kar sake', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Verify: Inventory page par redirect hona chahiye
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  // Test 2: Locked out user - Negative test case
  test('Locked out user ko error message milna chahiye', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Verify: Error message dikhna chahiye, login nahi hona chahiye
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
    await expect(page).not.toHaveURL(/inventory/);
  });

  // Test 3: Invalid password - Negative test case
  test('Galat password se login fail hona chahiye', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  // Test 4: Empty fields - Boundary test case
  test('Empty username/password ke sath error aana chahiye', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });

  // Test 5: Only username filled - Boundary test case
  test('Sirf username fill karne se password required error aaye', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.fill('#user-name', 'standard_user');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
  });

});
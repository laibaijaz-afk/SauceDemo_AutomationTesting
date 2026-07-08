const { test, expect } = require('@playwright/test');

// ============================================
// CHECKOUT FLOW TEST SUITE - SauceDemo
// (Ye sabse important test hai - poora E2E flow cover karta hai)
// ============================================

async function login(page) {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
}

test.describe('Checkout Flow (End-to-End)', () => {

  test('Poora checkout flow complete hona chahiye - Add to Cart se Order Confirmation tak', async ({ page }) => {
    // Step 1: Login karna
    await login(page);

    // Step 2: Product add karna cart mein
    await page.locator('.btn_inventory').first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Step 3: Cart icon click karna
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/cart/);

    // Step 4: Checkout button click karna
    await page.click('#checkout');
    await expect(page).toHaveURL(/checkout-step-one/);

    // Step 5: Shipping information fill karna
    await page.fill('#first-name', 'Ali');
    await page.fill('#last-name', 'Khan');
    await page.fill('#postal-code', '54000');
    await page.click('#continue');

    // Step 6: Order summary page par pahunchna
    await expect(page).toHaveURL(/checkout-step-two/);

    // Step 7: Order finish/complete karna
    await page.click('#finish');

    // Step 8: Verify - Order Complete message
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('Shipping info empty chhod kar continue karne se error aana chahiye', async ({ page }) => {
    await login(page);

    await page.locator('.btn_inventory').first().click();
    await page.click('.shopping_cart_link');
    await page.click('#checkout');

    // Fields empty chhod kar seedha continue click karna
    await page.click('#continue');

    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });

  test('Cart se item remove karna chahiye', async ({ page }) => {
    await login(page);

    await page.locator('.btn_inventory').first().click();
    await page.click('.shopping_cart_link');

    // Cart page par "Remove" button click karna
    await page.click('.cart_button');

    // Verify: Cart empty ho jani chahiye
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

});
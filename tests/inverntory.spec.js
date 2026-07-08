const { test, expect } = require('@playwright/test');

// ============================================
// INVENTORY/PRODUCTS TEST SUITE - SauceDemo
// ============================================

// Helper function - har test se pehle login karna
async function login(page) {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
}

test.describe('Inventory/Product Page', () => {

  test('Products list page load honi chahiye login ke baad', async ({ page }) => {
    await login(page);

    // Verify: 6 products dikhne chahiye (Sauce Demo mein hamesha 6 hote hain)
    const products = page.locator('.inventory_item');
    await expect(products).toHaveCount(6);
  });

  test('Products ko price ke hisaab se Low to High sort kar sakein', async ({ page }) => {
    await login(page);

    // Sort dropdown se "Price low to high" select karna
    await page.selectOption('.product_sort_container', 'lohi');

    // Verify: Pehla product ka price sab se kam hona chahiye
    const firstPrice = await page.locator('.inventory_item_price').first().textContent();
    expect(firstPrice).toBe('$7.99');
  });

  test('Product par click karne se detail page khulni chahiye', async ({ page }) => {
    await login(page);

    // Pehle product ka naam click karna
    await page.locator('.inventory_item_name').first().click();

    // Verify: Detail page par redirect hona chahiye
    await expect(page).toHaveURL(/inventory-item/);
  });

  test('Add to Cart button click karne se cart count 1 hona chahiye', async ({ page }) => {
    await login(page);

    // Pehla "Add to Cart" button click karna
    await page.locator('.btn_inventory').first().click();

    // Verify: Cart badge par "1" show hona chahiye
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Multiple items add karne se cart count sahi update ho', async ({ page }) => {
    await login(page);

    // 3 different items add karna
    const addButtons = page.locator('.btn_inventory');
    await addButtons.nth(0).click();
    await addButtons.nth(1).click();
    await addButtons.nth(2).click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
  });

});
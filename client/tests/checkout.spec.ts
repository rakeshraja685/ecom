import { test, expect } from '@playwright/test';

test('checkout flow', async ({ page }) => {
    // 1. Login first
    await page.goto('http://localhost:3000/login');
    await page.fill('input[type="email"]', 'admin@techmart.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('http://localhost:3000/');

    // 2. Go to products page
    await page.click('text=Shop Now');
    await expect(page).toHaveURL(/.*products/);

    // 3. Click on first product
    await page.click('text=View >> nth=0');

    // 4. Add to cart
    await page.click('text=Add to Cart');

    // 5. Go to cart
    await page.goto('http://localhost:3000/cart');
    await expect(page.locator('text=Proceed to Checkout')).toBeVisible();

    // 6. Proceed to checkout
    await page.click('text=Proceed to Checkout');

    // 7. Fill checkout form
    await page.fill('textarea', '123 Test St, Test City');
    await page.click('button:has-text("Place Order")');

    // 8. Verify success
    await expect(page).toHaveURL(/.*orders/);
    await expect(page.locator('text=Order #')).toBeVisible();
});

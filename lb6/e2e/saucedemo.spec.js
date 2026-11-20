import { test, expect } from '@playwright/test';

test('TC-01. Успішна авторизація', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');

    await page.getByTestId('login-button').click();

    await expect(page).toHaveURL(/.*inventory\.html/);

    await expect(page.getByTestId('title')).toHaveText('Products');
});

test('TC-02. Авторизація з неправильним паролем', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('wrong_password');

    await page.getByTestId('login-button').click();

    const errorMessage = page.getByTestId('error');
    await expect(errorMessage).toBeVisible();

    await expect(errorMessage).toContainText('Username and password do not match');
});

test('TC-03. Додавання товару до кошика', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click();

    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    await page.getByTestId('shopping-cart-link').click();

    await expect(page).toHaveURL(/.*cart\.html/);

    const cartItem = page.locator('.cart_item').filter({
        hasText: 'Sauce Labs Bolt T-Shirt',
    });

    await expect(cartItem).toHaveCount(1);
    await expect(cartItem.getByTestId('inventory-item-name'))
        .toHaveText('Sauce Labs Bolt T-Shirt');
});
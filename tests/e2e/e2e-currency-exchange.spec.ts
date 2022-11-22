import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage'

test.describe('Currency exchange test', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
        await page.click('#signin_button');
        await page.type('#user_login', 'username');
        await page.type('#user_password', 'password');
        await page.click('text=Sign In');

        await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html');
    });

    test('Purchase foreign currency cash',async ({ page }) => {
        await page.click('text=Purchase Foreign Currency');
        await page.selectOption('#pc_currency', 'MXN');
        const sellRate = await page.locator('#sp_sell_rate');
        await expect(sellRate).toBeVisible();

        await page.type('#pc_amount', '300');
        await page.click('#pc_inDollars_true');
        await page.click('#pc_calculate_costs');
        const amountMessage = await page.locator('#pc_conversion_amount');
        await expect(amountMessage).toBeVisible();

        await page.click('#purchase_cash');

        const message = await page.locator('#alert_content');
        await expect(message).toBeVisible();
        await expect(message).toContainText('Foreign currency cash was successfully purchased.');

    });
    
});
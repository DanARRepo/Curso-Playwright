import { test, expect } from '@playwright/test';

test.describe.parallel('Account activity tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
        await page.click('#signin_button');
        await page.type('#user_login', 'username');
        await page.type('#user_password', 'password');
        await page.click('text=Sign In');

        await page.goto('http://zero.webappsecurity.com/bank/account-activity.html');
    });

    test('verify content', async ({ page }) => {
        await page.selectOption('#aa_accountId', '2');
        const  accountChecking = await page.locator('#all_transactions_for_account tbody tr');
        await expect(accountChecking).toHaveCount(3);

        await page.selectOption('#aa_accountId', '3');
        await expect(accountChecking).toHaveCount(3);

        await page.selectOption('#aa_accountId', '4');
        await expect(accountChecking).toHaveCount(2);

        await page.selectOption('#aa_accountId', '5');
        const  noResult = await page.locator('.well');
        await expect(noResult).toBeVisible();

        await page.selectOption('#aa_accountId', '6');
        await expect(noResult).toBeVisible();
    });

});
import { test } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Login page visual test', () => {
    let loginpage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginpage = new LoginPage(page);

        await page.goto('http://zero.webappsecurity.com/login.html');
    });

    test('Login form',async ({ page }) => {
        await loginpage.snapshotLoginForm();
    });

    test('Login error message',async ({ page }) => {
        await page.click('text = Sign in');
        await loginpage.snapshotErrorMessage();
    })
});
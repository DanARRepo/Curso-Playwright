import { test, expect } from '@playwright/test';
import { username, password } from '../helper'
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';

test.describe.parallel('Login-logout flow', ()=> {

    let loginPage: LoginPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);

        await homePage.visit();
    });

    test('Login-Negative scenario',async ({ page }) => {
        await homePage.clickOnSignIn();
        await loginPage.login('invalid username', 'invalid password');
        await loginPage.wait(2000);
        await loginPage.assertErrorMessage();
    });

    test('Login/Logout-Negative scenario',async ({ page }) => {
        await homePage.clickOnSignIn();
        await loginPage.login(username,password);

        const welcomeMessage = page.locator('.mb5');
        await expect(welcomeMessage).toHaveText('Bienvenido paroliado!');

        await page.click('.btn--username');
        await page.click('.logout');
        
        const loginBtn = await page.locator('text=Ingresa >> nth=1');
        await expect(loginBtn).toBeVisible();
    })
});
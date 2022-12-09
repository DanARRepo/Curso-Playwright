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
        await loginPage.login('username','password');
        await page.goto('http://zero.webappsecurity.com/index.html')

        const userIcon = page.locator('text=username');
        await expect(userIcon).toBeVisible();

        await page.click('.icon-user');
        await page.click('#logout_link');
        
        const loginBtn = await page.locator('#signin_button');
        await expect(loginBtn).toBeVisible();
    })
});
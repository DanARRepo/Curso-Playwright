// import { test } from '@playwright/test';
// import { LoginPage } from '../../page-objects/LoginPage'
// import { HomePage } from '../../page-objects/HomePage'

// test.describe.only('Login page visual test', () => {
//     let loginpage: LoginPage;
//     let homepage: HomePage;

//     test.beforeEach(async ({ page }) => {
//         loginpage = new LoginPage(page);
//         homepage = new HomePage(page);

//         await homepage.visit();
//         await homepage.clickOnSignIn();
//     });

//     test('Login form',async ({ page }) => {
//         await loginpage.snapshotLoginForm();
//     });

//     test('Login error message',async ({ page }) => {
//         await page.click('text = Sign in');
//         await loginpage.snapshotErrorMessage();
//     })
// });
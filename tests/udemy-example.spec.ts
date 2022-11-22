import { test, expect } from '@playwright/test';
import { loadPage, typeSearchInput } from './helper';

const username = 'paroliado';
const password = 'Ludopatia.2022';

test ('simple basic test', async ({ page }) => {
    //here goes the test
    await page.goto('https://www.example.com');
    const pageTitle = page.locator('h1');
    await expect(pageTitle).toContainText('Example Domain');
    
});

test ('Click test', async ({ page }) => {
    await page.goto('https://www.example.com');
    await page.click('text = More information...');

    await expect(page).toHaveURL('https://www.iana.org/domains/reserved');
    
});

test ('inputs test', async ({ page }) => {
    await page.goto('https://www.betsson.co/');

    await page.click('.btn--login');
    await page.type('#usernameMPU', username);
    await page.type('#passwordMPU', password);

    await page.click('#login_button');

    const welcomeMessage = page.locator('.mb5');
    await expect(welcomeMessage).toHaveText('Bienvenido paroliado!');
});

test ('Assertions', async ({ page }) => {
    //Assertions examples
    await page.goto('https://www.example.com/');
    await expect(page).toHaveURL('https://www.example.com/');
    await expect(page).toHaveTitle('Example Domain');

    const element = await page.locator('a');
    await expect(element).toBeVisible();
    await expect(element).toHaveText('More information...');
    await expect(element).toHaveCount(1);
    
});

test('Screenshots tests', async ({ page }) => {
   await page.goto('https://www.example.com/');
   await page.screenshot({ path: 'screenshot.png', fullPage: true});
});

test('Single element screenshot', async ({ page }) => {
    await page.goto('https://www.cssscript.com/custom-social-share-buttons-with-javascript-and-html5-sharer-js/');
    const element = await page.$('.entry-title');
    await element?.screenshot({path: 'screenshots/single_element.png'});
});

test.describe.parallel('Hooks', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.example.com/');
    });

    test('screenshot',async ({ page }) => {
        await page.screenshot({ path: 'screenshots/hook_screenshot.png', fullPage:true });
    });

    test('single element',async ({ page }) => {
        const element = await page.$('h1');
        await element?.screenshot({path: 'screenshots/single_element.png'});
    })
});

test('Custom Helpers functions @myTag', async ({ page }) => {
    await loadPage(page);
    await typeSearchInput(page);
});

test('fail test', async ({ page }) => {
    await page.goto('https://www.example.com/');
    await page.waitForSelector('h5');
});


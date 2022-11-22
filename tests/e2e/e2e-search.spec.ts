import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage'

test.describe('Search results', () => {
    test('Should find search results',async ({ page }) => {
        let homePage:HomePage = new HomePage(page);

        await page.goto('http://zero.webappsecurity.com/index.html');
        await homePage.searchFor('bank');

        const numberLinks = await page.locator('li > a');
        await expect(numberLinks).toHaveCount(2);
    });
});
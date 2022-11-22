import { Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly signInButton: Locator;
    readonly searchBox: Locator;

    constructor ( page: Page) {
        this.page = page;
        this.signInButton = page.locator('header >> text=Ingresa');
        this.searchBox = page.locator('#searchTerm')
    }

    async visit() {
        await this.page.goto('https://www.betsson.co/');
    }

    async clickOnSignIn() {
        await this.signInButton.click();
    }

    async searchFor(phrase: string) {
        await this.searchBox.type(phrase);
        await this.page.keyboard.press('Enter');
    }
}
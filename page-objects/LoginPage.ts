import { expect, Locator, Page } from '@playwright/test';
import { AbstractPage } from './Components/AbstractPage';

export class LoginPage extends AbstractPage {

    // Selectors

    // readonly page: Page;
    readonly loginButton: Locator;
    readonly userInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButtton: Locator;
    readonly errorMessage: Locator;
    readonly loginForm: Locator;
    readonly errorZeroMessage: Locator;

    // Constructor - Init selectors
    constructor( page: Page) {
        super(page);
        this.userInput = page.locator('#usernameMPU');
        this.passwordInput = page.locator('#passwordMPU');
        this.submitButtton = page.locator('#login_button');
        this.errorMessage = page.locator('text=El usuario o la contraseña no son correctos');
        this.loginForm = page.locator('#login_form');
        this.errorZeroMessage = page.locator('.alert-error');
    }

    // Define functions
    async login(username:string, password:string) {
        await this.userInput.type(username);
        await this.passwordInput.type(password);
        await this.submitButtton.click();
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toBeVisible(); 
    }

    async snapshotLoginForm() {
        await expect(this.loginForm.screenshot()).toMatchSnapshot('login-form.png');
    }

    async snapshotErrorMessage() {
        await expect(this.errorZeroMessage.screenshot()).toMatchSnapshot('login-error.png');
    }
}
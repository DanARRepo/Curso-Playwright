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
        this.userInput = page.locator('#user_login');
        this.passwordInput = page.locator('#user_password');
        this.submitButtton = page.locator('.btn-primary >> text=Sign in');
        this.errorMessage = page.locator('.alert-error');
        this.loginForm = page.locator('#login_form');
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
        await expect(this.errorMessage.screenshot()).toMatchSnapshot('login-error.png');
    }
}
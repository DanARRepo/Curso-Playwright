import { test, expect } from '@playwright/test';
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe.parallel('Feedback form', () => {
    let feedbackPage: FeedbackPage;
    test.beforeEach(async ({ page }) => {
        feedbackPage = new FeedbackPage(page);
        await page.goto('http://zero.webappsecurity.com/');
        await page.click('#feedback');
        await expect(page).toHaveURL('http://zero.webappsecurity.com/feedback.html');
    });

    test('Reset feedback form', async ({ page }) => {
        await feedbackPage.fillForm('name', 'email@email.com', 'super subject', 'awesome comment');
        await feedbackPage.resetForm();
        await feedbackPage.assertReset();
    });

    test('Submit feedback form',async ({ page }) => {
        await feedbackPage.fillForm('name', 'email@email.com', 'super subject', 'awesome comment');
        await feedbackPage.submitForm();
        await feedbackPage.feedbackFormSend();
    });
});
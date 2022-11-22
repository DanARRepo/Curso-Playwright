import { test, expect } from '@playwright/test';
import { username, password } from './helper';

test('Rushbet test', async ({ page }) => {
  
  // Go to https://www.rushbet.co/?page=get-started
  await page.goto('https://www.rushbet.co/?page=get-started');

  // Go to https://www.rushbet.co/?page=get-started#home
  await page.goto('https://www.rushbet.co/?page=get-started#home');

  // Click button:has-text("ENTRAR")
  await page.locator('button:has-text("ENTRAR")').click();

  // Click [placeholder="Correo electrónico o usuario"]
  await page.locator('[placeholder="Correo electrónico o usuario"]').click();

  // Fill [placeholder="Correo electrónico o usuario"]
  await page.locator('[placeholder="Correo electrónico o usuario"]').fill(username);

  // Click [placeholder="Introduzca la contraseña"]
  await page.locator('[placeholder="Introduzca la contraseña"]').click();

  // Fill [placeholder="Introduzca la contraseña"]
  await page.locator('[placeholder="Introduzca la contraseña"]').fill(password);
  
  // Click #login-form-modal-submit
  await page.locator('#login-form-modal-submit').click();
  await expect(page).toHaveURL('https://www.rushbet.co/?page=get-started#home');
  
  await page.locator('.close-modal-button-container >> nth=0').click();

  // Click #rsi-top-navigation >> text=Casino
  await page.locator('#rsi-top-navigation >> text=Casino').click();
  await expect(page).toHaveURL('https://www.rushbet.co/?page=all-games');

  // Click button:has-text("RULETA")
  await page.locator('button:has-text("RULETA")').click();
  await expect(page).toHaveURL('https://www.rushbet.co/?page=all-games&categoryType=ROULETTE_GAMES');

  // Click img[alt="European Roulette"] >> nth=0
  await page.locator('img[alt="European Roulette"]').first().click();

  // Click button:has-text("Demo")
  await page.locator('button:has-text("Demo")').click();

  // Click text=Jugar Demo
  await page.locator('text=Jugar Demo').click();
  await expect(page).toHaveURL('https://www.rushbet.co/?page=all-games&categoryType=ROULETTE_GAMES&game=europeanroulette3_not_mobile_sw&gameMode=FUN');
  
});


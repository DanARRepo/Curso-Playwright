export const username = 'Paroliado';
export const password = 'Ludopatia.2022';

export async function loadPage(page) {
    await page.goto('https://www.google.com/');
}

export async function typeSearchInput(page) {
    const searchInput = await page.locator('[aria-label="Buscar"]');
    await searchInput.type('Minecraft');
    await searchInput.press('Enter');
}

import { addBugIdToUrl } from './utils';

describe('Страница /', () => {
    afterEach(async ({ browser }) => {
        await browser.execute(() => {
            window.localStorage.clear();
        });
    });
    it('существует страница Главная (/)', async ({ browser }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/'));
        const title = await browser.getTitle();
        expect(title).toBe('Welcome — Kogtetochka store');
    });
    it('скриншотный тест главной страницы', async ({ browser }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/'));
        const page = await browser.$('.Application');
        await page.waitForDisplayed();
        await page.assertView('plain');
    });
});

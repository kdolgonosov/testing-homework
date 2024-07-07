import { addBugIdToUrl } from './utils';

describe('Шапка', () => {
    afterEach(async ({ browser }) => {
        await browser.execute(() => {
            window.localStorage.clear();
        });
    });
    it('в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', async ({
        browser,
    }) => {
        const links = ['Catalog', 'Delivery', 'Contacts', 'Cart'];
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/'));
        const container = await browser.$('.navbar-nav');
        links.forEach(async (link) => {
            const linkElement = await container.$(`=${link}`);
            expect(linkElement).toBeExisting();
            expect(linkElement).toHaveHrefContaining(`hw/store/${link.toLowerCase()}`);
        });
    });
    it('название магазина в шапке должно быть ссылкой на главную страницу', async ({ browser }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/'));
        const el = await browser.$('=Kogtetochka store');
        expect(el).toHaveHrefContaining('/hw/store');
    });
    it('на ширине больше 575px не должен отображаться "гамбургер"', async ({ browser }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/'));
        await browser.setWindowSize(1200, 700);
        const el = await browser.$('button[aria-label="Toggle navigation"]');
        expect(el).not.toBeDisplayed();
    });
    it('на ширине меньше 576px должен отображаться "гамбургер"', async ({ browser }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/'));
        await browser.setWindowSize(575, 700);
        const el = await browser.$('button[aria-label="Toggle navigation"]');
        expect(el).toBeDisplayed();
    });
    it('на ширине меньше 576px меню должно быть скрыто', async ({ browser }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/'));
        await browser.setWindowSize(575, 700);
        const menu = await browser.$('.navbar-nav');
        expect(menu).not.toBeDisplayed();
    });
    it('на ширине меньше 576px при нажатии на "гамбургер" меню должно быть отображено', async ({
        browser,
    }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/'));
        await browser.setWindowSize(575, 700);
        const burger = await browser.$('button[aria-label="Toggle navigation"]');
        const menu = await browser.$('.navbar-nav');
        await burger.click();
        expect(menu).toBeDisplayed();
    });
    it('на ширине меньше 576px при открытом меню после нажатия на ссылку меню должно быть скрыто', async ({
        browser,
    }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/'));
        await browser.setWindowSize(575, 700);
        const burger = await browser.$('button[aria-label="Toggle navigation"]');
        const menu = await browser.$('.navbar-nav');
        await burger.click();
        const link = await menu.$('=Catalog');
        await link.click();
        await menu.waitForDisplayed({ reverse: true });
        expect(menu).not.toBeDisplayed();
    });
});

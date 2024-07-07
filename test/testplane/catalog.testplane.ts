import { addBugIdToUrl } from './utils';

describe('Страница /catalog', async () => {
    afterEach(async ({ browser }) => {
        await browser.execute(() => {
            window.localStorage.clear();
        });
    });
    it('существует страница Каталог (/catalog)', async ({ browser }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/catalog'));
        const title = await browser.getTitle();
        expect(title).toBe('Catalog — Kogtetochka store');
    });
    it('для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', async ({
        browser,
    }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/catalog'));
        const products = await browser.$$('.ProductItem');
        const productTitle = await products[0].$('.ProductItem-Name');
        const productPrice = await products[0].$('.ProductItem-Price');
        const productLink = await products[0].$('.ProductItem-DetailsLink');
        await expect(productTitle).toBeDisplayed();
        expect(productPrice).toBeExisting();
        expect(productLink).toHaveHrefContaining(`/hw/store/catalog/${0}`);
    });
});

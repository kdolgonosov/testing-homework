import { addBugIdToUrl } from './utils';

describe('Страница /catalog/id', () => {
    afterEach(async ({ browser }) => {
        await browser.execute(() => {
            window.localStorage.clear();
        });
    });
    // it('существует страница Каталог (/catalog)', async ({ browser }) => {
    //     await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/catalog'));
    //     const title = await browser.getTitle();
    //     expect(title).toBe('Catalog — Kogtetochka store');
    // });
    it('верстка соотвествует макету', async ({ browser }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/catalog/0'));
        const page = await browser.$('.Application');
        await page.waitForDisplayed();
        await page.assertView('plain', {
            ignoreElements: [
                '.ProductDetails-Name',
                '.ProductDetails-Description',
                '.ProductDetails-Price',
                '.ProductDetails-Color',
                '.ProductDetails-Material',
            ],
        });
    });
    it('на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', async ({
        browser,
    }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/catalog/1'));
        const product = await browser.$('.ProductDetails');
        const productTitle = await product.$('.ProductDetails-Name');
        const productDescription = await product.$('.ProductDetails-Description');
        const productPrice = await product.$('.ProductDetails-Price');
        const productColor = await product.$('.ProductDetails-Color');
        const productMaterial = await browser.$('.ProductDetails-Material');
        const addToCartButton = await product.$('.ProductDetails-AddToCart');
        await expect(productTitle).toBeExisting();
        await expect(productDescription).toBeExisting();
        await expect(productPrice).toBeExisting();
        await expect(productColor).toBeExisting();
        await expect(productMaterial).toBeExisting();
        await expect(addToCartButton).toBeExisting();
    });
    it('при нажатии на кнопку "Add to Cart" товар должен быть добавлен в корзину', async ({
        browser,
    }) => {
        // 0":{"name":"Gorgeous kogtetochka","count":1,"price":122}
        const id = 0;
        await browser.url(addBugIdToUrl(`http://localhost:3000/hw/store/catalog/${id}`));
        const product = await browser.$('.ProductDetails');
        // const cartLink = await browser.$('=Cart');

        const productTitle = await (await browser.$('.ProductDetails-Name')).getText();
        const productPrice = (await (await browser.$('.ProductDetails-Price')).getText()).substring(
            1,
        );

        const addToCartButton = await product.$('.ProductDetails-AddToCart');
        await addToCartButton.click();

        const cartData: string = await browser.execute(() => {
            const cartData = window.localStorage.getItem('example-store-cart');
            return cartData;
        });
        expect(cartData).toStrictEqual(
            JSON.stringify({ [id]: { name: productTitle, count: 1, price: Number(productPrice) } }),
        );
        // const cartBadge = await browser.$('.CartBadge');
        // await expect(cartBadge).toBeExisting();
        // await expect(cartBadge).toHaveText('Item in cart');
        // await expect(cartLink).toHaveText('Cart (1)');
    });
    it('если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом"', async ({
        browser,
    }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/catalog/0'));
        const product = await browser.$('.ProductDetails');
        // const cartLink = await browser.$('=Cart');
        const addToCartButton = await product.$('.ProductDetails-AddToCart');
        await addToCartButton.click();
        const cartBadge = await browser.$('.CartBadge');
        expect(cartBadge).toBeExisting();
        expect(cartBadge).toHaveText('Item in cart');
        // await expect(cartLink).toHaveText('Cart (1)');
    });
});

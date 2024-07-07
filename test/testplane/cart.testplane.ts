import { addBugIdToUrl } from './utils';
// import { JestAssertionError}  from 'jest';

describe('Страница /cart', () => {
    // afterEach(async ({ browser }) => {
    //     await browser.execute(() => {
    //         window.localStorage.clear();
    //     });
    // });
    it('существует страница Корзина (/cart)', async ({ browser }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/cart'));
        const title = await browser.getTitle();
        expect(title).toBe('Shopping cart — Kogtetochka store');
    });
    it('в корзине должна отображаться таблица с добавленными в нее товарами', async ({
        browser,
    }) => {
        // const ids = [0, 1, 2];
        // for (let j = 0; j < 3; j++) {
        //     await browser.url(addBugIdToUrl(`http://localhost:3000/hw/store/catalog/${ids[j]}`));
        //     const product = await browser.$('.ProductDetails');
        //     const addToCartButton = await product.$('.ProductDetails-AddToCart');
        //     for (let i = 0; i < Math.random() * 10; i++) {
        //         await addToCartButton.click();
        //     }
        // }

        const initData = JSON.stringify({
            '0': { name: 'Тест', count: 1, price: 1 },
        });
        await browser.execute((initData) => {
            return window.localStorage.setItem('example-store-cart', initData);
        }, initData);
        // addSomeProducts({browser})
        const cartData = await browser.execute(() => {
            return JSON.parse(window.localStorage.getItem('example-store-cart'));
        });
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/cart'));
        const cartTable = await browser.$('.Cart-Table');
        expect(cartTable).toExist();
    });
    it('для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа', async ({
        browser,
    }) => {
        // const ids = [0, 1, 2];
        // for (let j = 0; j < 3; j++) {
        //     await browser.url(addBugIdToUrl(`http://localhost:3000/hw/store/catalog/${ids[j]}`));
        //     const product = await browser.$('.ProductDetails');
        //     const addToCartButton = await product.$('.ProductDetails-AddToCart');
        //     for (let i = 0; i < Math.random() * 10; i++) {
        //         await addToCartButton.click();
        //     }
        // }

        const initData = JSON.stringify({
            '0': { name: 'Тест', count: 1, price: 1 },
        });
        await browser.execute((initData) => {
            return window.localStorage.setItem('example-store-cart', initData);
        }, initData);
        const cartData = await browser.execute(() => {
            return JSON.parse(window.localStorage.getItem('example-store-cart'));
        });
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/cart'));
        const cartTable = await browser.$('.Cart-Table');
        // for (let i = 0; i < Object.keys(cartData).length; i++) {
        //     const row = await cartTable.$(`tr[data-testid="${ids[i]}"]`);
        //     const name = await row.$('.Cart-Name').getText();
        //     const count = await row.$('.Cart-Count').getText();
        //     const price = (await row.$('.Cart-Price').getText()).substring(1);
        //     expect(name).toBe(cartData[Object.keys(cartData)[i]].name);
        //     expect(parseInt(count)).toBe(cartData[Object.keys(cartData)[i]].count);
        //     expect(parseInt(price)).toBe(cartData[Object.keys(cartData)[i]].price);
        // }
        const row = await cartTable.$(`tr[data-testid="0"]`);
        const name = await row.$('.Cart-Name').getText();
        const count = await row.$('.Cart-Count').getText();
        const price = (await row.$('.Cart-Price').getText()).substring(1);
        expect(name).toBe('Тест');
        expect(parseInt(count)).toBe(1);
        expect(parseInt(price)).toBe(1);
    });
    it('в корзине должна быть кнопка "очистить корзину"', async ({ browser }) => {
        // const ids = [0, 1, 2];
        // for (let j = 0; j < 3; j++) {
        //     await browser.url(addBugIdToUrl(`http://localhost:3000/hw/store/catalog/${ids[j]}`));
        //     const product = await browser.$('.ProductDetails');
        //     const addToCartButton = await product.$('.ProductDetails-AddToCart');
        //     for (let i = 0; i < Math.random() * 10; i++) {
        //         await addToCartButton.click();
        //     }
        // }

        const initData = JSON.stringify({
            '0': { name: 'Тест', count: 1, price: 1 },
        });
        await browser.execute((initData) => {
            return window.localStorage.setItem('example-store-cart', initData);
        }, initData);
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/cart'));
        const clearButton = browser.$('.Cart-Clear');
        expect(clearButton).toExist();
    });
    it('по нажатию на кнопку "очистить корзину" все товары должны удаляться', async ({
        browser,
    }) => {
        // const ids = [0, 1, 2];
        // for (let j = 0; j < 3; j++) {
        //     await browser.url(addBugIdToUrl(`http://localhost:3000/hw/store/catalog/${ids[j]}`));
        //     const product = await browser.$('.ProductDetails');
        //     const addToCartButton = await product.$('.ProductDetails-AddToCart');
        //     for (let i = 0; i < Math.random() * 10; i++) {
        //         await addToCartButton.click();
        //     }
        // }
        const initData = JSON.stringify({
            '0': { name: 'Тест', count: 1, price: 1 },
        });
        await browser.execute((initData) => {
            return window.localStorage.setItem('example-store-cart', initData);
        }, initData);
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/cart'));
        const clearButton = browser.$('.Cart-Clear');
        expect(clearButton).toExist();
        await clearButton.click();
        const cartData = await browser.execute(() => {
            return JSON.parse(window.localStorage.getItem('example-store-cart'));
        });
        expect(cartData).toEqual({});
    });
    it('если корзина пустая, должна отображаться ссылка на каталог товаров', async ({
        browser,
    }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/cart'));

        const catalogLink = await browser.$('=catalog');
        await expect(catalogLink).toHaveHrefContaining('/hw/store/catalog');
    });
    it('если корзина не пустая, должна отображаться форма для заказа', async ({ browser }) => {
        const initData = JSON.stringify({
            '0': { name: 'Тест', count: 1, price: 1 },
        });
        await browser.execute((initData) => {
            return window.localStorage.setItem('example-store-cart', initData);
        }, initData);
        await browser.url(addBugIdToUrl(`http://localhost:3000/hw/store/cart`));
        const form = await browser.$('.Form');
        const nameInput = await form.$('#f-name');
        const phoneInput = await form.$('#f-phone');
        const addressInput = await form.$('#f-address');
        const submitButton = await form.$('.Form-Submit');
        expect(form).toBeExisting();
        expect(nameInput).toBeExisting();
        expect(phoneInput).toBeExisting();
        expect(addressInput).toBeExisting();
        expect(submitButton).toBeExisting();
    });
    it('содержимое корзины должно сохраняться между перезагрузками страницы', async ({
        browser,
    }) => {
        const id = 0;
        await browser.url(addBugIdToUrl(`http://localhost:3000/hw/store/catalog/${id}`));
        const productTitle = await (await browser.$('.ProductDetails-Name')).getText();
        const productPrice = (await (await browser.$('.ProductDetails-Price')).getText()).substring(
            1,
        );
        const initData = JSON.stringify({
            [id]: { name: productTitle, count: 1, price: parseInt(productPrice) },
        });
        await browser.execute((initData) => {
            return window.localStorage.setItem('example-store-cart', initData);
        }, initData);

        await browser.refresh();

        const cartData: string = await browser.execute(() => {
            const cartData = window.localStorage.getItem('example-store-cart');
            return cartData;
        });
        // console.log('CARTDATA', cartData);
        expect(JSON.parse(cartData)).toStrictEqual(JSON.parse(initData));
    });
    describe('Форма заказа', () => {
        beforeEach(async ({ browser }) => {
            await browser.url(addBugIdToUrl(`http://localhost:3000/hw/store/cart`));
            const initData = JSON.stringify({
                '0': { name: 'Тест', count: 1, price: 1 },
            });
            await browser.execute((initData) => {
                return window.localStorage.setItem('example-store-cart', initData);
            }, initData);
        });

        it('форма для заказов не должна отправляться без заполненного имени', async ({
            browser,
        }) => {
            // const initData = JSON.stringify({
            //     '0': { name: 'Тест', count: 1, price: 1 },
            // });
            // await browser.execute((initData) => {
            //     return window.localStorage.setItem('example-store-cart', initData);
            // }, initData);
            // await browser.url(addBugIdToUrl(`http://localhost:3000/hw/store/cart`));
            const cart = await browser.$('.Cart');
            const form = await cart.$('.Form');
            // const nameInput = await form.$('#f-name');
            const phoneInput = await form.$('#f-phone');
            const addressInput = await form.$('#f-address');
            const submitButton = await form.$('.Form-Submit');
            // await nameInput.setValue('Test name');
            await phoneInput.setValue('1234567890');
            await addressInput.setValue('Test address');
            await submitButton.click();
            const succMess = cart.$('.Cart-SuccessMessage');
            await succMess.waitForDisplayed({ reverse: true });
            expect(succMess).not.toBeDisplayed();
        });
        it('форма для заказов должна выводить сообщение об ошибке при отправке без заполненного имени', async ({
            browser,
        }) => {
            // const initData = JSON.stringify({
            //     '0': { name: 'Тест', count: 1, price: 1 },
            // });
            // await browser.execute((initData) => {
            //     return window.localStorage.setItem('example-store-cart', initData);
            // }, initData);
            // await browser.url(addBugIdToUrl(`http://localhost:3000/hw/store/cart`));
            const cart = await browser.$('.Cart');
            const form = await cart.$('.Form');
            const nameInput = await form.$('#f-name');
            const phoneInput = await form.$('#f-phone');
            const addressInput = await form.$('#f-address');
            const submitButton = await form.$('.Form-Submit');
            await phoneInput.setValue('1234567890');
            await addressInput.setValue('Test address');
            await submitButton.click();
            const errMess = cart.$('#f-name + .invalid-feedback');
            await errMess.waitForDisplayed();
            expect(errMess).toBeDisplayed();
            expect(nameInput).toHaveElementClassContaining('is-invalid');
        });
        it('форма для заказов не должна отправляться без заполненного телефона', async ({
            browser,
        }) => {
            // const initData = JSON.stringify({
            //     '0': { name: 'Тест', count: 1, price: 1 },
            // });
            // await browser.execute((initData) => {
            //     return window.localStorage.setItem('example-store-cart', initData);
            // }, initData);
            // await browser.url(addBugIdToUrl(`http://localhost:3000/hw/store/cart`));
            const cart = await browser.$('.Cart');
            const form = await cart.$('.Form');
            const nameInput = await form.$('#f-name');
            const addressInput = await form.$('#f-address');
            const submitButton = await form.$('.Form-Submit');
            await nameInput.setValue('Test name');
            await addressInput.setValue('Test address');
            await submitButton.click();
            const succMess = cart.$('.Cart-SuccessMessage');
            // await succMess.waitForDisplayed({ reverse: true });
            await succMess.waitForDisplayed({ reverse: true });
            expect(succMess).not.toBeDisplayed();
        });
        it('форма для заказов должна выводить сообщение об ошибке при отправке без заполненного телефона', async ({
            browser,
        }) => {
            // const initData = JSON.stringify({
            //     '0': { name: 'Тест', count: 1, price: 1 },
            // });
            // await browser.execute((initData) => {
            //     return window.localStorage.setItem('example-store-cart', initData);
            // }, initData);
            // await browser.url(addBugIdToUrl(`http://localhost:3000/hw/store/cart`));
            const cart = await browser.$('.Cart');
            const form = await cart.$('.Form');
            const nameInput = await form.$('#f-name');
            const phoneInput = await form.$('#f-phone');
            const addressInput = await form.$('#f-address');
            const submitButton = await form.$('.Form-Submit');
            await nameInput.setValue('Test name');
            await addressInput.setValue('Test address');
            await submitButton.click();
            const errMess = cart.$('#f-phone + .invalid-feedback');
            await errMess.waitForDisplayed();
            expect(errMess).toBeDisplayed();
            expect(phoneInput).toHaveElementClassContaining('is-invalid');
        });
        it('форма для заказов не должна отправляться с неккоректным телефоном', async ({
            browser,
        }) => {
            // const initData = JSON.stringify({
            //     '0': { name: 'Тест', count: 1, price: 1 },
            // });
            // await browser.execute((initData) => {
            //     return window.localStorage.setItem('example-store-cart', initData);
            // }, initData);
            // await browser.url(addBugIdToUrl(`http://localhost:3000/hw/store/cart`));
            const cart = await browser.$('.Cart');
            const form = await cart.$('.Form');
            const nameInput = await form.$('#f-name');
            const phoneInput = await form.$('#f-phone');
            const addressInput = await form.$('#f-address');
            const submitButton = await form.$('.Form-Submit');
            await nameInput.setValue('Test name');
            await phoneInput.setValue('телефон');
            await addressInput.setValue('Test address');
            await submitButton.click();
            const succMess = cart.$('.Cart-SuccessMessage');
            await succMess.waitForDisplayed({ reverse: true });
            expect(succMess).not.toBeDisplayed();
        });
        it('форма для заказов должна выводить сообщение об ошибке при отправке с некорректным телефоном', async ({
            browser,
        }) => {
            // const initData = JSON.stringify({
            //     '0': { name: 'Тест', count: 1, price: 1 },
            // });
            // await browser.execute((initData) => {
            //     return window.localStorage.setItem('example-store-cart', initData);
            // }, initData);
            // await browser.url(addBugIdToUrl(`http://localhost:3000/hw/store/cart`));
            const cart = await browser.$('.Cart');
            const form = await cart.$('.Form');
            const nameInput = await form.$('#f-name');
            const phoneInput = await form.$('#f-phone');
            const addressInput = await form.$('#f-address');
            const submitButton = await form.$('.Form-Submit');
            await nameInput.setValue('Test name');
            await phoneInput.setValue('телефон');
            await addressInput.setValue('Test address');
            await submitButton.click();
            const errMess = cart.$('#f-phone + .invalid-feedback');
            await errMess.waitForDisplayed();
            expect(errMess).toBeDisplayed();
            expect(phoneInput).toHaveElementClassContaining('is-invalid');
            expect(errMess).toHaveText('Please provide a valid phone');
        });
        it('форма для заказов не должна отправляться без заполненного адреса', async ({
            browser,
        }) => {
            // const initData = JSON.stringify({
            //     '0': { name: 'Тест', count: 1, price: 1 },
            // });
            // await browser.execute((initData) => {
            //     return window.localStorage.setItem('example-store-cart', initData);
            // }, initData);
            // await browser.url(addBugIdToUrl(`http://localhost:3000/hw/store/cart`));
            const cart = await browser.$('.Cart');
            const form = await cart.$('.Form');
            const nameInput = await form.$('#f-name');
            const phoneInput = await form.$('#f-phone');
            const submitButton = await form.$('.Form-Submit');
            await nameInput.setValue('Test name');
            await phoneInput.setValue('1234567890');
            await submitButton.click();
            const succMess = cart.$('.Cart-SuccessMessage');
            await succMess.waitForDisplayed({ reverse: true });
            expect(succMess).not.toBeDisplayed();
        });
        it('форма для заказов должна выводить сообщение об ошибке при отправке без заполненного адреса', async ({
            browser,
        }) => {
            // const initData = JSON.stringify({
            //     '0': { name: 'Тест', count: 1, price: 1 },
            // });
            // await browser.execute((initData) => {
            //     return window.localStorage.setItem('example-store-cart', initData);
            // }, initData);
            // await browser.url(addBugIdToUrl(`http://localhost:3000/hw/store/cart`));
            const cart = await browser.$('.Cart');
            const form = await cart.$('.Form');
            const nameInput = await form.$('#f-name');
            const phoneInput = await form.$('#f-phone');
            const addressInput = await form.$('#f-address');
            const submitButton = await form.$('.Form-Submit');
            await nameInput.setValue('Test name');
            await phoneInput.setValue('1234567890');
            await submitButton.click();
            const errMess = cart.$('#f-address + .invalid-feedback');
            await errMess.waitForDisplayed();
            expect(errMess).toBeDisplayed();
            expect(addressInput).toHaveElementClassContaining('is-invalid');
        });
        it('форма для заказов должна выводить сообщение об успехе, после заполнения и отправки', async ({
            browser,
        }) => {
            const cart = await browser.$('.Cart');
            const form = await cart.$('.Form');
            const nameInput = await form.$('#f-name');
            const phoneInput = await form.$('#f-phone');
            const addressInput = await form.$('#f-address');
            const submitButton = await form.$('.Form-Submit');
            await nameInput.setValue('Test name');
            await phoneInput.setValue('1234567890');
            await addressInput.setValue('Test address');
            await submitButton.click();
            const succMess = cart.$('.Cart-SuccessMessage');
            await succMess.waitForExist();
            await expect(succMess).toHaveElementClassContaining('alert-success');
            // expect(succMess.getAttribute('class')).toContain('alert-success');
        });
    });
});

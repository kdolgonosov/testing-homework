import { addBugIdToUrl } from './utils';

describe('Страница /delivery', () => {
    afterEach(async ({ browser }) => {
        await browser.execute(() => {
            window.localStorage.clear();
        });
    });
    it('существует страница Доставка (/delivery)', async ({ browser }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/delivery'));
        const title = await browser.getTitle();
        expect(title).toBe('Delivery — Kogtetochka store');
    });
    it('верстка страницы соотвествует макету', async ({ browser }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/delivery'));
        const page = await browser.$('.Application');
        await page.waitForDisplayed();
        await page.assertView('plain');
    });
    it('страница Доставка должна иметь статический контент', async ({ browser }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/delivery'));
        const deliveryContent = [
            'Swift and Secure Delivery: Experience the convenience of hassle-free shipping with our scratchers. We understand the excitement of receiving your new cat furniture, so we prioritize swift delivery to your doorstep. Rest assured, your order is handled with care every step of the way, ensuring it arrives safely and securely.',
            'Track Your Package with Ease: Stay informed and in control of your delivery with our easy-to-use tracking system. From the moment your order is placed to the minute it reaches your home, you can monitor its journey in real-time. No more guessing games – know exactly when to expect your package and plan accordingly.',
            'Customer Satisfaction Guaranteed: Your satisfaction is our top priority, which is why we go above and beyond to provide exceptional delivery service. If you have any questions or concerns about your shipment, our dedicated customer support team is here to assist you every step of the way. Trust us to deliver not only your scratcher but also peace of mind.',
        ];
        const container = await browser.$('.Delivery');
        const pageContent = await container.$$('p').map(async (i) => await i.getText());
        expect(pageContent).toStrictEqual(deliveryContent);
    });
});

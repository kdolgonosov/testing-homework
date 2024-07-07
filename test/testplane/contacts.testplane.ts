import { addBugIdToUrl } from './utils';

describe('Страница /contacts', () => {
    afterEach(async ({ browser }) => {
        await browser.execute(() => {
            window.localStorage.clear();
        });
    });
    it('существует страница Контакты (/contacts)', async ({ browser }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/contacts'));
        const title = await browser.getTitle();
        expect(title).toStrictEqual('Contacts — Kogtetochka store');
    });
    it('страница Контакты должна иметь статический контент', async ({ browser }) => {
        await browser.url(addBugIdToUrl('http://localhost:3000/hw/store/contacts'));
        const contactsContent = [
            "Have a question about our scratchers or need help placing an order? Don't hesitate to reach out to us! Our dedicated team is here to provide you with top-notch service and support.",
            'Our friendly representatives are available during business hours to assist you with any inquiries you may have.',
            "At our store, customer satisfaction is our priority, and we're committed to ensuring you have a smooth and enjoyable shopping experience. Reach out to us today – we're here to help make your cat's scratching dreams a reality!",
        ];
        const container = await browser.$('.Contacts');
        const pageContent = await container.$$('p').map(async (i) => await i.getText());
        expect(pageContent).toStrictEqual(contactsContent);
    });
});

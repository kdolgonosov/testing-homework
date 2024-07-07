// import React from 'react';
// import '@testing-library/jest-dom/jest-globals';

// import { BrowserRouter, MemoryRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { expect, jest, test, describe, it } from '@jest/globals';
// import { render, screen, waitFor } from '@testing-library/react';
// // import { ExampleApi } from '../../../ДЗ 6/src/client/api';
// import { CartApi, ExampleApi } from '../../src/client/api';
// import { initStore } from '../../src/client/store';
// import { Application } from '../../src/client/Application';
// import { Delivery } from '../../src/client/pages/Delivery';
// import { Contacts } from '../../src/client/pages/Contacts';
// export function resizeWindow(width: number = 1920, height: number = 1080) {
//     window.innerWidth = width;
//     window.innerHeight = height;
//     window.dispatchEvent(new Event('resize'));
// }
// describe('Simple Test Case', () => {
//     it('Should render', () => {
//         const app = <div>example</div>;

//         const { container } = render(app);

//         console.log(container.outerHTML);

//         expect(container).toBeInTheDocument();
//     });
// });
// describe('Мой тест', () => {
//     // it('Should render', async () => {
//     //     const basename = '/hw/store';
//     //     const api = new ExampleApi(basename);
//     //     const cart = new CartApi();
//     //     const store = initStore(api, cart);
//     //     const app = (
//     //         <BrowserRouter basename={'/'}>
//     //             <Provider store={store}>
//     //                 <Application />
//     //             </Provider>
//     //         </BrowserRouter>
//     //     );

//     //     const { container, getAllByRole } = render(app);
//     //     const links = getAllByRole('link');
//     // });
//     // it('название магазина в шапке должно быть ссылкой на главную страницу', () => {
//     //     const basename = '/hw/store';
//     //     const api = new ExampleApi(basename);
//     //     const cart = new CartApi();
//     //     const store = initStore(api, cart);
//     //     const app = (
//     //         <BrowserRouter basename={'/'}>
//     //             <Provider store={store}>
//     //                 <Application />
//     //             </Provider>
//     //         </BrowserRouter>
//     //     );
//     //     const name = 'Kogtetochka store';
//     //     const { getByRole } = render(app);
//     //     const logo = getByRole('link', { name });
//     //     expect(logo.getAttribute('href')).toBe('/');
//     // });
//     it('Гамбургер', () => {
//         const basename = '/hw/store';
//         const api = new ExampleApi(basename);
//         const cart = new CartApi();
//         const store = initStore(api, cart);
//         const app = (
//             <MemoryRouter initialIndex={0} initialEntries={['/catalog']}>
//                 <Provider store={store}>
//                     <Application />
//                 </Provider>
//             </MemoryRouter>
//         );
//         const { container, getByRole } = render(app);
//         // resizeWindow();
//         const hamburgerButton = screen.getByLabelText('Toggle navigation', { selector: 'button' });
//         const test = screen.getByRole('button', {
//             name: /toggle navigation/i,
//         });
//         // screen.logTestingPlaygroundURL();
//         expect(test.parentElement).toBeVisible();
//     });
//     // it('Существует страница /catalog', () => {
//     //     const basename = '/hw/store';
//     //     const api = new ExampleApi(basename);
//     //     const cart = new CartApi();
//     //     const store = initStore(api, cart);
//     //     const app = (
//     //         <MemoryRouter initialIndex={0} initialEntries={['/catalog']}>
//     //             <Provider store={store}>
//     //                 <Application />
//     //             </Provider>
//     //         </MemoryRouter>
//     //     );
//     //     const { getByRole } = render(app);
//     //     const title = getByRole('heading');
//     //     expect(title.textContent).toBe('Catalog');
//     // });
// });

// // describe('Страница /', () => {
// //     it('Существует страница /', () => {
// //         const basename = '/hw/store';
// //         const api = new ExampleApi(basename);
// //         const cart = new CartApi();
// //         const store = initStore(api, cart);
// //         const app = (
// //             <MemoryRouter initialIndex={0} initialEntries={['/']}>
// //                 <Provider store={store}>
// //                     <Application />
// //                 </Provider>
// //             </MemoryRouter>
// //         );
// //         const { container, getByRole } = render(app);

// //         // screen.logTestingPlaygroundURL();
// //         // const title = getByRole('heading');
// //         // expect(title.textContent).toBe('Delivery');
// //     });
// //     it('Cтраница /delivery имеет статическое содержимое', () => {
// //         // const basename = '/hw/store';
// //         // const api = new ExampleApi(basename);
// //         // const cart = new CartApi();
// //         // const store = initStore(api, cart);
// //         // const app = (
// //         //     <MemoryRouter initialIndex={0} initialEntries={['/delivery']}>
// //         //         <Provider store={store}>
// //         //             <Application />
// //         //         </Provider>
// //         //     </MemoryRouter>
// //         // );
// //         const deliveryContent = [
// //             'Swift and Secure Delivery: Experience the convenience of hassle-free shipping with our scratchers. We understand the excitement of receiving your new cat furniture, so we prioritize swift delivery to your doorstep. Rest assured, your order is handled with care every step of the way, ensuring it arrives safely and securely.',
// //             'Track Your Package with Ease: Stay informed and in control of your delivery with our easy-to-use tracking system. From the moment your order is placed to the minute it reaches your home, you can monitor its journey in real-time. No more guessing games – know exactly when to expect your package and plan accordingly.',
// //             'Customer Satisfaction Guaranteed: Your satisfaction is our top priority, which is why we go above and beyond to provide exceptional delivery service. If you have any questions or concerns about your shipment, our dedicated customer support team is here to assist you every step of the way. Trust us to deliver not only your scratcher but also peace of mind.',
// //         ];
// //         const app = <Delivery />;
// //         const { container } = render(app);
// //         const pageContent = Array.from(container.querySelectorAll('p')).map((el) => el.textContent);
// //         // screen.logTestingPlaygroundURL();
// //         // console.log(content);
// //         // const title = getByRole('heading');
// //         expect(pageContent).toEqual(deliveryContent);
// //         // const
// //     });
// // });
// const flushPromises = () => new Promise(setImmediate);
// describe('Страница /catalog', () => {
//     it('Существует страница /catalog', () => {
//         const basename = '/hw/store';
//         const api = new ExampleApi(basename);
//         const cart = new CartApi();
//         const store = initStore(api, cart);
//         const app = (
//             <MemoryRouter initialIndex={0} initialEntries={['/catalog']}>
//                 <Provider store={store}>
//                     <Application />
//                 </Provider>
//             </MemoryRouter>
//         );
//         const { getByRole } = render(app);
//         screen.logTestingPlaygroundURL();
//         const title = getByRole('heading');
//         expect(title.textContent).toBe('Catalog');
//     });
//     it('/catalog загружаются товары', async () => {
//         const basename = '/hw/store';
//         const api = new ExampleApi(basename);
//         const cart = new CartApi();
//         const store = initStore(api, cart);
//         const app = (
//             <MemoryRouter initialIndex={0} initialEntries={['/catalog']}>
//                 <Provider store={store}>
//                     <Application />
//                 </Provider>
//             </MemoryRouter>
//         );
//         // await flushPromises();
//         // container.update()
//         // screen.logTestingPlaygroundURL();
//         // await waitFor(() => {
//         // expect()
//         // });
//         await waitFor(() => {
//             const { container } = render(app);
//             const test = container.querySelectorAll('.ProductItem');
//             console.log(test.length);
//             // screen.logTestingPlaygroundURL();
//             // const test = screen.findByTestId(0);
//             // expect(test).toBeInTheDocument();
//         });
//         // const productElements = await screen.findAllByTestId(0);
//         // expect(productElements.length).toBeGreaterThan(0);
//     });
// });
// describe('Страница /delivery', () => {
//     it('Существует страница /delivery', () => {
//         const basename = '/hw/store';
//         const api = new ExampleApi(basename);
//         const cart = new CartApi();
//         const store = initStore(api, cart);
//         const app = (
//             <MemoryRouter initialIndex={0} initialEntries={['/delivery']}>
//                 <Provider store={store}>
//                     <Application />
//                 </Provider>
//             </MemoryRouter>
//         );
//         const { getByRole } = render(app);
//         const title = getByRole('heading');
//         expect(title.textContent).toBe('Delivery');
//     });
//     it('Cтраница /delivery имеет статическое содержимое', () => {
//         // const basename = '/hw/store';
//         // const api = new ExampleApi(basename);
//         // const cart = new CartApi();
//         // const store = initStore(api, cart);
//         // const app = (
//         //     <MemoryRouter initialIndex={0} initialEntries={['/delivery']}>
//         //         <Provider store={store}>
//         //             <Application />
//         //         </Provider>
//         //     </MemoryRouter>
//         // );
//         const deliveryContent = [
//             'Swift and Secure Delivery: Experience the convenience of hassle-free shipping with our scratchers. We understand the excitement of receiving your new cat furniture, so we prioritize swift delivery to your doorstep. Rest assured, your order is handled with care every step of the way, ensuring it arrives safely and securely.',
//             'Track Your Package with Ease: Stay informed and in control of your delivery with our easy-to-use tracking system. From the moment your order is placed to the minute it reaches your home, you can monitor its journey in real-time. No more guessing games – know exactly when to expect your package and plan accordingly.',
//             'Customer Satisfaction Guaranteed: Your satisfaction is our top priority, which is why we go above and beyond to provide exceptional delivery service. If you have any questions or concerns about your shipment, our dedicated customer support team is here to assist you every step of the way. Trust us to deliver not only your scratcher but also peace of mind.',
//         ];
//         const app = <Delivery />;
//         const { container } = render(app);
//         const pageContent = Array.from(container.querySelectorAll('p')).map((el) => el.textContent);
//         // screen.logTestingPlaygroundURL();
//         // console.log(content);
//         // const title = getByRole('heading');
//         expect(pageContent).toEqual(deliveryContent);
//     });
// });

// describe('Страница /contacts', () => {
//     it('Существует страница /contacts', () => {
//         const basename = '/hw/store';
//         const api = new ExampleApi(basename);
//         const cart = new CartApi();
//         const store = initStore(api, cart);
//         const app = (
//             <MemoryRouter initialIndex={0} initialEntries={['/contacts']}>
//                 <Provider store={store}>
//                     <Application />
//                 </Provider>
//             </MemoryRouter>
//         );
//         const { getByRole } = render(app);
//         const title = getByRole('heading');
//         expect(title.textContent).toBe('Contacts');
//     });
//     it('Cтраница /contacts имеет статическое содержимое', () => {
//         // const basename = '/hw/store';
//         // const api = new ExampleApi(basename);
//         // const cart = new CartApi();
//         // const store = initStore(api, cart);
//         // const app = (
//         //     <MemoryRouter initialIndex={0} initialEntries={['/delivery']}>
//         //         <Provider store={store}>
//         //             <Application />
//         //         </Provider>
//         //     </MemoryRouter>
//         // );
//         const contactsContent = [
//             "Have a question about our scratchers or need help placing an order? Don't hesitate to reach out to us! Our dedicated team is here to provide you with top-notch service and support.",
//             'Our friendly representatives are available during business hours to assist you with any inquiries you may have.',
//             "At our store, customer satisfaction is our priority, and we're committed to ensuring you have a smooth and enjoyable shopping experience. Reach out to us today – we're here to help make your cat's scratching dreams a reality!",
//         ];
//         const app = <Contacts />;
//         const { container } = render(app);
//         const pageContent = Array.from(container.querySelectorAll('p')).map((el) => el.textContent);
//         // screen.logTestingPlaygroundURL();
//         // console.log(content);
//         // const title = getByRole('heading');
//         expect(pageContent).toEqual(contactsContent);
//     });
// });

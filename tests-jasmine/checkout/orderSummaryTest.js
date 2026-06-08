import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage, cart} from '../../data/cart.js';
import { loadProducts, loadProductsFetch } from '../../data/products.js';

describe('test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeAll((done) => {
        loadProductsFetch().then(() => {
            done();    
        })
        /*
        loadProducts(() => { //done is given as callback parameter
            done();
        });
        */
    });

    beforeEach(() => {
        // becasue clicking delete calls removeFromCart at some point. And removeFromCart in its urn modifies cart. We do not want the actual cart to be modified, so we use mock of setItem method instead
      spyOn(localStorage, 'setItem');

        // set up HTML for renderOrderSummary()
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;

        // set up cart for renderOrderSummary()
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity: 1,
                    deliveryOptionId: '1'
                },
                {
                    productId: productId2,
                    quantity: 2,
                    deliveryOptionId: '2'
                }
            ]);
        });
        loadFromStorage(); 
        
        // function we are testing - renderOrderSummary()
        renderOrderSummary();
    });

    afterEach(() => {
        //clean the HTML after the test are performed
        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('display the cart', () => {
        // tests = expectations
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 1');
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 2');
    });

    it('removes a product', () => {
        document.querySelector(`.js-delete-link-${productId1}`).click(); // calls renderPaymentSummary, and it in its turn requires <div class="js-payment-summary"></div> to populate. So we add it in the set up HTML

        // tests = expectations
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
    });
});
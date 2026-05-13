import {addToCart, cart, loadFromStorage} from '../../data/cart.js'; // 1st time loading cart with real values

describe('test suite: addToCart', () => {
    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });

        loadFromStorage();

        // function we are testing - addToCart()
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        // tests = expectations
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    });

    it('adds a new product to the cart', () => {
        // mock setItam because addToCart calls setItem at some point and we don't want it to actualy alter real data in cart
        spyOn(localStorage, 'setItem');

        // mock fake values in the cart
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        // 2nd time loading cart (=re-loading cart), this time with fake values created using spyOn
        loadFromStorage();

        // function we are testing - addToCart()
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); // calls setItem at some point

        // tests = expectations
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});
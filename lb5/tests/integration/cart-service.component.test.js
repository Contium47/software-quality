import { describe, expect, test } from 'vitest';

import { CartService } from '../../src/cart-service.js';

describe('CartService (component)', () => {
    test('starts with an empty cart', () => {
        const cart = new CartService();
        expect(cart.getItems()).toEqual([]);
        expect(cart.getTotal()).toBe(0);
    });

    test('adds a single item to the cart', () => {
        const cart = new CartService();
        cart.addItem('p1', 'Apple', 10, 2);

        const items = cart.getItems();
        expect(items).toHaveLength(1);
        expect(items[0]).toMatchObject({
            productId: 'p1',
            name: 'Apple',
            price: 10,
            quantity: 2,
        });
        expect(cart.getTotal()).toBe(20);
    });

    test('increments quantity when adding the same product again', () => {
        const cart = new CartService();
        cart.addItem('p1', 'Apple', 10, 2);
        cart.addItem('p1', 'Apple', 10, 3);

        const items = cart.getItems();
        expect(items).toHaveLength(1);
        expect(items[0].quantity).toBe(5);
        expect(cart.getTotal()).toBe(50);
    });

    test('adds multiple different products', () => {
        const cart = new CartService();
        cart.addItem('p1', 'Apple', 10, 1);
        cart.addItem('p2', 'Banana', 5, 4);

        expect(cart.getItems()).toHaveLength(2);
        expect(cart.getTotal()).toBe(10 + 20);
    });

    test('removes an existing item', () => {
        const cart = new CartService();
        cart.addItem('p1', 'Apple', 10, 2);
        cart.addItem('p2', 'Banana', 5, 1);

        cart.removeItem('p1');

        const items = cart.getItems();
        expect(items).toHaveLength(1);
        expect(items[0].productId).toBe('p2');
        expect(cart.getTotal()).toBe(5);
    });

    test('throws when removing a non-existent product', () => {
        const cart = new CartService();
        expect(() => cart.removeItem('nonexistent')).toThrow(
            'not found in cart'
        );
    });

    test('clears the cart', () => {
        const cart = new CartService();
        cart.addItem('p1', 'Apple', 10, 2);
        cart.clearCart();

        expect(cart.getItems()).toEqual([]);
        expect(cart.getTotal()).toBe(0);
    });

    test.each([
        ['', 'Name', 10, 1],
        [null, 'Name', 10, 1],
        [undefined, 'Name', 10, 1],
        ['p1', '', 10, 1],
        ['p1', null, 10, 1],
        ['p1', 'Name', -5, 1],
        ['p1', 'Name', 10, 0],
        ['p1', 'Name', 10, -1],
        ['p1', 'Name', 10, 1.5],
    ])(
        'throws on invalid input: addItem(%s, %s, %s, %s)',
        (productId, name, price, quantity) => {
            const cart = new CartService();
            expect(() => cart.addItem(productId, name, price, quantity)).toThrow();
        }
    );
});

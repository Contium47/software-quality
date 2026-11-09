import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';

import { CartService } from '../../src/cart-service.js';
import { ExternalEchoGateway } from '../../src/external-echo.gateway.js';

const MOCK_URL = 'https://echo-service.example.com/api/echo';

beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('Cart + ExternalEchoGateway (system)', () => {
    test('adds item to cart and echoes confirmation via gateway', async () => {
        const cart = new CartService();
        const gateway = new ExternalEchoGateway(MOCK_URL);
        const mockFetch = globalThis.fetch;

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ echo: 'added: Apple x2' }),
        });

        cart.addItem('p1', 'Apple', 10, 2);
        const echo = await gateway.echo(`added: Apple x2`);

        expect(cart.getTotal()).toBe(20);
        expect(echo).toBe('added: Apple x2');
        expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    test('full checkout flow: add items, compute total, echo summary, clear cart', async () => {
        const cart = new CartService();
        const gateway = new ExternalEchoGateway(MOCK_URL);
        const mockFetch = globalThis.fetch;

        cart.addItem('p1', 'Apple', 10, 2);
        cart.addItem('p2', 'Banana', 5, 3);
        expect(cart.getTotal()).toBe(35);

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ echo: 'checkout total: 35' }),
        });

        const summary = await gateway.echo('checkout total: 35');
        expect(summary).toBe('checkout total: 35');

        cart.clearCart();
        expect(cart.getItems()).toEqual([]);
        expect(cart.getTotal()).toBe(0);
    });

    test('propagates gateway error when echo service is down', async () => {
        const cart = new CartService();
        const gateway = new ExternalEchoGateway(MOCK_URL);
        const mockFetch = globalThis.fetch;

        cart.addItem('p1', 'Apple', 10, 1);

        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 503,
        });

        await expect(gateway.echo('alert: service down')).rejects.toThrow(
            'External echo gateway failed with status 503'
        );

        // Cart remains intact despite gateway failure
        expect(cart.getTotal()).toBe(10);
    });

    test('removes item and echoes removal confirmation', async () => {
        const cart = new CartService();
        const gateway = new ExternalEchoGateway(MOCK_URL);
        const mockFetch = globalThis.fetch;

        cart.addItem('p1', 'Apple', 10, 1);
        cart.removeItem('p1');

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ echo: 'removed: Apple' }),
        });

        const echo = await gateway.echo('removed: Apple');
        expect(echo).toBe('removed: Apple');
        expect(cart.getTotal()).toBe(0);
    });
});

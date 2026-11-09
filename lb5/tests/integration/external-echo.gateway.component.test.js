import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';

import { ExternalEchoGateway } from '../../src/external-echo.gateway.js';

const MOCK_URL = 'https://echo-service.example.com/api/echo';

beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('ExternalEchoGateway (component)', () => {
    test('sends a POST request with the message and returns the echo', async () => {
        const gateway = new ExternalEchoGateway(MOCK_URL);
        const mockFetch = globalThis.fetch;
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ echo: 'hello' }),
        });

        const result = await gateway.echo('hello');

        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(MOCK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'hello' }),
        });
        expect(result).toBe('hello');
    });

    test('returns message field when echo field is absent', async () => {
        const gateway = new ExternalEchoGateway(MOCK_URL);
        const mockFetch = globalThis.fetch;
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ message: 'fallback' }),
        });

        const result = await gateway.echo('test');

        expect(result).toBe('fallback');
    });

    test('throws when the response is not ok', async () => {
        const gateway = new ExternalEchoGateway(MOCK_URL);
        const mockFetch = globalThis.fetch;
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
        });

        await expect(gateway.echo('fail')).rejects.toThrow(
            'External echo gateway failed with status 500'
        );
    });

    test('throws on invalid message input', async () => {
        const gateway = new ExternalEchoGateway(MOCK_URL);
        await expect(gateway.echo('')).rejects.toThrow('message');
        await expect(gateway.echo(null)).rejects.toThrow('message');
        await expect(gateway.echo(123)).rejects.toThrow('message');
    });

    test('throws when response lacks echo/message fields', async () => {
        const gateway = new ExternalEchoGateway(MOCK_URL);
        const mockFetch = globalThis.fetch;
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        });

        await expect(gateway.echo('test')).rejects.toThrow(
            'Invalid echo response'
        );
    });
});

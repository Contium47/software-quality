import {
    describe,
    expect,
    test,
} from 'vitest';

import {
    calculateDiscount,
    validateQuantity,
    getShippingCost,
} from '../src/shop-utils.js';

describe('calculateDiscount', () => {
    test(
        'returns 90 for price 100 and discount 10%',
        () => {
            // Arrange
            const price = 100;
            const percent = 10;

            // Act
            const result = calculateDiscount(
                price,
                percent
            );

            // Assert
            expect(result).toBe(90);
        }
    );

    test(
        'returns 100 for price 100 and discount 0%',
        () => {
            const result = calculateDiscount(100, 0);

            expect(result).toBe(100);
        }
    );

    test(
        'returns 0 for price 100 and discount 100%',
        () => {
            const result = calculateDiscount(100, 100);

            expect(result).toBe(0);
        }
    );

    test(
        'throws an error for negative price',
        () => {
            expect(() => calculateDiscount(-10, 10))
                .toThrow('Price must be a non-negative number');
        }
    );

    test(
        'throws an error for discount greater than 100%',
        () => {
            expect(() => calculateDiscount(100, 101))
                .toThrow('Discount must be between 0 and 100');
        }
    );
});

describe('validateQuantity', () => {
    test.for([
        { quantity: 0, expected: false },
        { quantity: 1, expected: true },
        { quantity: 2, expected: true },
        { quantity: 9, expected: true },
        { quantity: 10, expected: true },
        { quantity: 11, expected: false },
        { quantity: 1.5, expected: false },
    ])(
        'validateQuantity($quantity) returns $expected',
        ({ quantity, expected }) => {
            expect(validateQuantity(quantity)).toBe(expected);
        }
    );
});

describe('getShippingCost', () => {
    test(
        'returns 100 for total 999',
        () => {
            expect(getShippingCost(999)).toBe(100);
        }
    );

    test(
        'returns 0 for total 1000',
        () => {
            expect(getShippingCost(1000)).toBe(0);
        }
    );

    test(
        'throws an error for negative total',
        () => {
            expect(() => getShippingCost(-1))
                .toThrow('Total must be a non-negative number');
        }
    );
});


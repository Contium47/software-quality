export class CartService {
    constructor() {
        this.items = [];
    }

    addItem(productId, name, price, quantity) {
        if (!productId || typeof productId !== 'string') {
            throw new Error('productId must be a non-empty string');
        }
        if (!name || typeof name !== 'string') {
            throw new Error('name must be a non-empty string');
        }
        if (!Number.isFinite(price) || price < 0) {
            throw new Error('price must be a non-negative number');
        }
        if (!Number.isInteger(quantity) || quantity < 1) {
            throw new Error('quantity must be a positive integer');
        }

        const existing = this.items.find((item) => item.productId === productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({ productId, name, price, quantity });
        }

        return this.items;
    }

    removeItem(productId) {
        const index = this.items.findIndex((item) => item.productId === productId);
        if (index === -1) {
            throw new Error(`Product with id "${productId}" not found in cart`);
        }
        this.items.splice(index, 1);
        return this.items;
    }

    getItems() {
        return [...this.items];
    }

    getTotal() {
        return this.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    }

    clearCart() {
        this.items = [];
        return [];
    }
}

import toast from 'react-hot-toast';

export const toasts = {
    addToCartToast: (productTitle: string) => {
        toast.success(`${productTitle} added to cart!`, {
            style: {
                background: '#1e293b',
                color: '#e2e8f0',
                border: '1px solid #06b6d4',
            },
            position: 'top-center',
        });
    },

    removeFromCartToast: (productTitle: string) => {
        toast.error(`${productTitle} removed from cart.`, {
            style: {
                background: '#1e293b',
                color: '#e2e8f0',
                border: '1px solid #ef4444',
            },
            position: 'top-center',
        });
    },

    checkoutToast: (totalItems: number, totalPrice: number) => {
        toast.success(`Checkout successful! ${totalItems} items purchased for $${totalPrice.toFixed(2)}.`, {
            style: {
                background: '#1e293b',
                color: '#e2e8f0',
                border: '1px solid #10b981',
            },
            position: 'top-center',
        });
    },
};

export const { addToCartToast, removeFromCartToast, checkoutToast } = toasts;

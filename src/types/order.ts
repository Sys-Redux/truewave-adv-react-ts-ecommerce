export interface OrderItem {
    productId: string;
    title: string;
    price: number;
    quantity: number;
    imageURL: string;
}

export interface Order {
    id: string;
    userId: string;
    userEmail: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}

export type CreateOrderData = Omit<Order, 'id' | 'createdAt' | 'updatedAt'>;
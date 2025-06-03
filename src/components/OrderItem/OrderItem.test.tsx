import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { OrderItem } from './OrderItem';

const mockOrder = {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    customer: {
        name: "Jane Smith",
        email: "jane.smith@example.com"
    },
    products: [
        {
            id: "404daf2a-9b97-41f3-b04d-e3e5a7dc8cb4",
            name: "Smartphone",
            price: 699.99,
            quantity: 1
        },
        {
            id: "6d62d909-f957-430e-8689-b5129c0bb75e",
            name: "Phone Case",
            price: 19.99,
            quantity: 1
        }
    ],
    total: 719.98,
    status: "processing",
    orderDate: "2023-10-05T14:30:00Z",
    paymentMethod: "credit_card"
};

describe('OrderItem Component', () => {
    it('should render order ID correctly', () => {
        render(<OrderItem order={mockOrder} />);
        const orderId = screen.getByText(/Order #3ac68afc/);
        expect(orderId).toBeInTheDocument();
    });

    it('should render customer information correctly', () => {
        render(<OrderItem order={mockOrder} />);
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
    });

    it('should render products list correctly', () => {
        render(<OrderItem order={mockOrder} />);
        expect(screen.getByText('Smartphone x1')).toBeInTheDocument();
        expect(screen.getByText('Phone Case x1')).toBeInTheDocument();
    });

    it('should calculate and display product prices correctly', () => {
        render(<OrderItem order={mockOrder} />);
        expect(screen.getByText('$699.99')).toBeInTheDocument();
        expect(screen.getByText('$19.99')).toBeInTheDocument();
    });

    it('should display total amount correctly', () => {
        render(<OrderItem order={mockOrder} />);
        expect(screen.getByText('$719.98')).toBeInTheDocument();
    });

    it('should format date correctly', () => {
        render(<OrderItem order={mockOrder} />);
        const formattedDate = new Date(mockOrder.orderDate).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

    it('should display payment method correctly', () => {
        render(<OrderItem order={mockOrder} />);
        expect(screen.getByText('credit card')).toBeInTheDocument();
    });

    it('should render status badge', () => {
        render(<OrderItem order={mockOrder} />);
        expect(screen.getByText('PROCESSING')).toBeInTheDocument();
    });
}); 
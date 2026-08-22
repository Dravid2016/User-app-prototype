import { Order } from '../types';
import { MOCK_FOODS } from './foods';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'FZ-90241',
    date: 'Today, 11:20 AM',
    items: [
      { food: MOCK_FOODS[0], quantity: 1 },
      { food: MOCK_FOODS[1], quantity: 1 },
    ],
    itemTotal: 225,
    deliveryFee: 20,
    packagingCharges: 15,
    total: 260,
    status: 'preparing',
    deliveryAddress: 'Home — 12, Anna Nagar, Chennai',
    paymentMethod: 'GPay / UPI',
    eta: '32 min',
  },
  {
    id: 'FZ-88102',
    date: 'Yesterday, 8:15 PM',
    items: [
      { food: MOCK_FOODS[3], quantity: 2 },
      { food: MOCK_FOODS[4], quantity: 1 },
    ],
    itemTotal: 405,
    deliveryFee: 20,
    packagingCharges: 15,
    total: 440,
    status: 'delivered',
    deliveryAddress: 'Home — 12, Anna Nagar, Chennai',
    paymentMethod: 'Credit Card',
    eta: 'Delivered',
  }
];

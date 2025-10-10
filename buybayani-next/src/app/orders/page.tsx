'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock order data - in a real app, this would come from an API
const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2025-001',
    status: 'preparing' as OrderStatus,
    orderDate: '2025-10-08',
    deliveryDate: '2025-10-12',
    items: [
      { name: 'Potato (Fresh)', quantity: 2, unit: 'kg', price: 170 },
      { name: 'Tomato (Red)', quantity: 1, unit: 'kg', price: 120 },
    ],
    total: 290,
    farmer: 'Santos Family Farm',
    deliveryAddress: '123 Main St, Quezon City, Metro Manila'
  },
  {
    id: 'ORD-2025-002',
    status: 'delivered' as OrderStatus,
    orderDate: '2025-10-01',
    deliveryDate: '2025-10-05',
    items: [
      { name: 'Sweet Corn', quantity: 6, unit: 'ears', price: 360 },
    ],
    total: 360,
    farmer: 'Mountainview Organic Farm',
    deliveryAddress: '123 Main St, Quezon City, Metro Manila'
  }
];

type OrderStatus = 'preparing' | 'packed' | 'out_for_delivery' | 'delivered' | 'cancelled';

interface OrderItem {
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

interface Order {
  id: string;
  status: OrderStatus;
  orderDate: string;
  deliveryDate: string;
  items: OrderItem[];
  total: number;
  farmer: string;
  deliveryAddress: string;
}

const STATUS_MESSAGES = {
  preparing: 'Your order is being prepared by the farmer',
  packed: 'Your order has been packed and ready for delivery',
  out_for_delivery: 'Your order is out for delivery',
  delivered: 'Your order has been delivered',
  cancelled: 'Your order has been cancelled'
};

const STATUS_COLORS = {
  preparing: '#f59e0b',
  packed: '#3b82f6',
  out_for_delivery: '#8b5cf6',
  delivered: '#10b981',
  cancelled: '#ef4444'
};

function getNextDeliveryDate(): Date {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
  
  // Delivery day is Saturday (6)
  let daysUntilDelivery = (6 - dayOfWeek) % 7;
  
  // If today is Saturday and it's past cutoff time (6 PM), move to next week
  if (dayOfWeek === 6 && today.getHours() >= 18) {
    daysUntilDelivery = 7;
  }
  
  // If daysUntilDelivery is 0 (today is Saturday), delivery is today if before 6 PM
  if (daysUntilDelivery === 0 && today.getHours() < 18) {
    daysUntilDelivery = 0;
  } else if (daysUntilDelivery === 0) {
    daysUntilDelivery = 7;
  }
  
  const nextDelivery = new Date(today);
  nextDelivery.setDate(today.getDate() + daysUntilDelivery);
  nextDelivery.setHours(10, 0, 0, 0); // Delivery time: 10 AM
  
  return nextDelivery;
}

function getOrderCutoffDate(): Date {
  const nextDelivery = getNextDeliveryDate();
  const cutoff = new Date(nextDelivery);
  cutoff.setDate(nextDelivery.getDate() - 2); // Orders must be placed 2 days before delivery
  cutoff.setHours(23, 59, 59, 999); // End of day
  
  return cutoff;
}

function DeliveryCountdown() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [nextDelivery, setNextDelivery] = useState<Date>(new Date());
  const [orderCutoff, setOrderCutoff] = useState<Date>(new Date());

  useEffect(() => {
    setNextDelivery(getNextDeliveryDate());
    setOrderCutoff(getOrderCutoffDate());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const cutoffTime = orderCutoff.getTime();
      const difference = cutoffTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [orderCutoff]);

  const isOrderingOpen = new Date() < orderCutoff;

  return (
    <div className="delivery-countdown">
      <div className="countdown-header">
        <h2>Next Delivery Schedule</h2>
        <p className="delivery-date">
          📅 {nextDelivery.toLocaleDateString('en-PH', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })} at 10:00 AM
        </p>
      </div>

      {isOrderingOpen ? (
        <div className="countdown-active">
          <p className="countdown-label">Order cutoff in:</p>
          <div className="countdown-timer">
            <div className="time-unit">
              <span className="time-number">{timeLeft.days}</span>
              <span className="time-label">Days</span>
            </div>
            <div className="time-unit">
              <span className="time-number">{timeLeft.hours}</span>
              <span className="time-label">Hours</span>
            </div>
            <div className="time-unit">
              <span className="time-number">{timeLeft.minutes}</span>
              <span className="time-label">Minutes</span>
            </div>
            <div className="time-unit">
              <span className="time-number">{timeLeft.seconds}</span>
              <span className="time-label">Seconds</span>
            </div>
          </div>
          <p className="countdown-message">
            ⏰ Place your orders before {orderCutoff.toLocaleDateString('en-PH', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })} at 11:59 PM
          </p>
        </div>
      ) : (
        <div className="countdown-closed">
          <p className="closed-message">
            🚫 Ordering is currently closed for this delivery cycle
          </p>
          <p className="next-opening">
            Next ordering opens after this Saturday&apos;s delivery
          </p>
        </div>
      )}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <div className="order-card">
      <div className="order-header">
        <div className="order-id">
          <h3>Order #{order.id}</h3>
          <span className="order-date">
            Placed on {new Date(order.orderDate).toLocaleDateString('en-PH')}
          </span>
        </div>
        <div className="order-status">
          <span 
            className="status-badge" 
            style={{ backgroundColor: STATUS_COLORS[order.status] }}
          >
            {order.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      <div className="order-progress">
        <div className="progress-steps">
          <div className={`step ${['preparing', 'packed', 'out_for_delivery', 'delivered'].includes(order.status) ? 'completed' : ''}`}>
            <div className="step-icon">📦</div>
            <span>Preparing</span>
          </div>
          <div className={`step ${['packed', 'out_for_delivery', 'delivered'].includes(order.status) ? 'completed' : ''}`}>
            <div className="step-icon">📋</div>
            <span>Packed</span>
          </div>
          <div className={`step ${['out_for_delivery', 'delivered'].includes(order.status) ? 'completed' : ''}`}>
            <div className="step-icon">🚚</div>
            <span>Out for Delivery</span>
          </div>
          <div className={`step ${order.status === 'delivered' ? 'completed' : ''}`}>
            <div className="step-icon">✅</div>
            <span>Delivered</span>
          </div>
        </div>
      </div>

      <div className="order-details">
        <div className="order-info">
          <p className="status-message">{STATUS_MESSAGES[order.status]}</p>
          <p className="delivery-info">
            <strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString('en-PH')}
          </p>
          <p className="farmer-info">
            <strong>From:</strong> {order.farmer}
          </p>
          <p className="address-info">
            <strong>Delivery Address:</strong> {order.deliveryAddress}
          </p>
        </div>

        <div className="order-items">
          <h4>Items Ordered</h4>
          <ul className="items-list">
            {order.items.map((item, index) => (
              <li key={index} className="item">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">{item.quantity} {item.unit}</span>
                <span className="item-price">₱{item.price}</span>
              </li>
            ))}
          </ul>
          <div className="order-total">
            <strong>Total: ₱{order.total}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  const [orders] = useState<Order[]>(MOCK_ORDERS);

  return (
    <div className="order-tracking-page">
      <div className="page-header">
        <h1>Order Tracking</h1>
        <p className="page-subtitle">
          Track your fresh produce orders and stay updated on delivery schedules
        </p>
      </div>

      <DeliveryCountdown />

      <div className="orders-section">
        <h2>Your Orders</h2>
        {orders.length > 0 ? (
          <div className="orders-list">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="no-orders">
            <p>You haven&apos;t placed any orders yet.</p>
            <Link href="/" className="btn-primary">Start Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
}
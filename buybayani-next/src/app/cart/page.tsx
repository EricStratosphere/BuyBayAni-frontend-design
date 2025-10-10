'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
  farmer: string;
  inStock: boolean;
}

// Mock cart data - in a real app, this would come from a cart context/API
const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: 'potato-fresh',
    name: 'Potato (Fresh)',
    price: 85,
    quantity: 2,
    unit: 'kg',
    image: '/file.svg',
    farmer: 'Santos Family Farm',
    inStock: true
  },
  {
    id: 'tomato-red',
    name: 'Tomato (Red)',
    price: 120,
    quantity: 1,
    unit: 'kg',
    image: '/file.svg',
    farmer: 'Santos Family Farm',
    inStock: true
  },
  {
    id: 'sweet-corn',
    name: 'Sweet Corn',
    price: 60,
    quantity: 4,
    unit: 'ears',
    image: '/file.svg',
    farmer: 'Mountainview Organic Farm',
    inStock: true
  },
  {
    id: 'eggplant',
    name: 'Eggplant',
    price: 70,
    quantity: 1,
    unit: 'kg',
    image: '/file.svg',
    farmer: 'Sunrise Vegetable Garden',
    inStock: false // Out of stock item
  }
];

function CartItemCard({ 
  item, 
  onUpdateQuantity, 
  onRemove, 
  isSelected, 
  onToggleSelect 
}: {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 99) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className={`cart-item ${!item.inStock ? 'out-of-stock' : ''}`}>
      <div className="item-selection">
        <input
          type="checkbox"
          checked={isSelected && item.inStock}
          onChange={() => onToggleSelect(item.id)}
          disabled={!item.inStock}
          className="item-checkbox"
        />
      </div>

      <div className="item-image">
        <Image 
          src={item.image} 
          alt={item.name}
          width={80}
          height={80}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="item-details">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-farmer">from {item.farmer}</p>
        <p className="item-price">₱{item.price} per {item.unit}</p>
        
        {!item.inStock && (
          <span className="out-of-stock-badge">Out of Stock</span>
        )}
      </div>

      <div className="item-quantity">
        <label className="quantity-label">Quantity</label>
        <div className="quantity-controls">
          <button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={!item.inStock || item.quantity <= 1}
          >
            −
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            min="1"
            max="99"
            className="quantity-input"
            disabled={!item.inStock}
          />
          <button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={!item.inStock || item.quantity >= 99}
          >
            +
          </button>
        </div>
        <span className="item-unit">{item.unit}</span>
      </div>

      <div className="item-total">
        <span className="total-price">₱{itemTotal}</span>
      </div>

      <div className="item-actions">
        <button 
          className="remove-btn"
          onClick={() => onRemove(item.id)}
          title="Remove from cart"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

function CartSummary({ 
  selectedItems, 
  onCheckout 
}: {
  selectedItems: CartItem[];
  onCheckout: () => void;
}) {
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = selectedItems.length > 0 ? 50 : 0; // Fixed delivery fee
  const total = subtotal + deliveryFee;

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      
      <div className="summary-row">
        <span>Subtotal ({selectedItems.length} items)</span>
        <span>₱{subtotal}</span>
      </div>
      
      <div className="summary-row">
        <span>Delivery Fee</span>
        <span>₱{deliveryFee}</span>
      </div>
      
      <div className="summary-divider"></div>
      
      <div className="summary-row total-row">
        <span>Total</span>
        <span>₱{total}</span>
      </div>

      <div className="delivery-info">
        <p>📅 Next delivery: Saturday, Oct 12</p>
        <p>⏰ Order by Thursday 11:59 PM</p>
      </div>

      <button 
        className="checkout-btn"
        onClick={onCheckout}
        disabled={selectedItems.length === 0}
      >
        Proceed to Checkout ({selectedItems.length})
      </button>

      <Link href="/" className="continue-shopping">
        ← Continue Shopping
      </Link>
    </div>
  );
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_CART_ITEMS);
  const [selectedItems, setSelectedItems] = useState<string[]>(
    MOCK_CART_ITEMS.filter(item => item.inStock).map(item => item.id)
  );

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    setSelectedItems(selected => selected.filter(itemId => itemId !== id));
  };

  const handleToggleSelect = (id: string) => {
    setSelectedItems(selected => {
      if (selected.includes(id)) {
        return selected.filter(itemId => itemId !== id);
      } else {
        return [...selected, id];
      }
    });
  };

  const handleSelectAll = () => {
    const inStockItems = cartItems.filter(item => item.inStock);
    if (selectedItems.length === inStockItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(inStockItems.map(item => item.id));
    }
  };

  const handleCheckout = () => {
    // In a real app, this would navigate to checkout page
    alert(`Proceeding to checkout with ${selectedItems.length} items!`);
  };

  const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
  const inStockItems = cartItems.filter(item => item.inStock);

  return (
    <div className="cart-page">
      <div className="page-header">
        <h1>My Cart</h1>
        <p className="page-subtitle">
          Review your items and proceed to checkout
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some fresh produce to get started!</p>
          <Link href="/" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-header">
              <div className="select-all">
                <input
                  type="checkbox"
                  checked={selectedItems.length === inStockItems.length && inStockItems.length > 0}
                  onChange={handleSelectAll}
                  className="select-all-checkbox"
                />
                <label>
                  Select All ({inStockItems.length} items)
                </label>
              </div>
              <span className="cart-count">
                {cartItems.length} items in cart
              </span>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                  isSelected={selectedItems.includes(item.id)}
                  onToggleSelect={handleToggleSelect}
                />
              ))}
            </div>
          </div>

          <div className="cart-sidebar">
            <CartSummary 
              selectedItems={selectedCartItems}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      )}
    </div>
  );
}
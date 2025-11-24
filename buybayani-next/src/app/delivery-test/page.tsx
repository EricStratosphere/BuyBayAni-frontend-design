"use client"

import { getDeliveryOptions, isSameDayDeliveryAvailable, calculateSameDayFee } from '../../utils/delivery';

export default function DeliveryTestPage() {
  const deliveryOptions = getDeliveryOptions();
  const sameDayAvailable = isSameDayDeliveryAvailable();
  
  return (
    <div className="delivery-test-page">
      <div className="page-header">
        <h1>Same-Day Delivery Test</h1>
        <p className="page-subtitle">
          Testing same-day delivery functionality and availability
        </p>
      </div>

      <div className="test-section">
        <h2>Current Status</h2>
        <div className="status-grid">
          <div className="status-card">
            <h3>Same-Day Delivery Available</h3>
            <p className={`status ${sameDayAvailable ? 'available' : 'unavailable'}`}>
              {sameDayAvailable ? '✅ Available' : '❌ Not Available'}
            </p>
            <small>
              Available on weekends (Sat/Sun) before 2 PM
            </small>
          </div>

          <div className="status-card">
            <h3>Current Day</h3>
            <p>{new Date().toLocaleDateString('en-PH', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>

          <div className="status-card">
            <h3>Current Time</h3>
            <p>{new Date().toLocaleTimeString('en-PH')}</p>
          </div>
        </div>
      </div>

      <div className="test-section">
        <h2>Delivery Options</h2>
        <div className="options-grid">
          {deliveryOptions.map((option, index) => (
            <div key={index} className={`option-card ${option.type}`}>
              <h3>{option.type === 'same-day' ? '⚡ Same-Day Delivery' : '📦 Standard Delivery'}</h3>
              <p><strong>Fee:</strong> ₱{option.fee}</p>
              <p><strong>Available:</strong> {option.available ? 'Yes' : 'No'}</p>
              <p><strong>Delivery Date:</strong> {option.deliveryDate.toLocaleDateString('en-PH')}</p>
              {option.deliveryWindow && (
                <p><strong>Time Window:</strong> {option.deliveryWindow}</p>
              )}
              <p><strong>Description:</strong> {option.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="test-section">
        <h2>Fee Calculator Test</h2>
        <div className="calculator-grid">
          {[500, 750, 1000, 1500].map(amount => (
            <div key={amount} className="calculator-card">
              <h4>Cart Total: ₱{amount}</h4>
              <p>Same-Day Fee: ₱{calculateSameDayFee(amount)}</p>
              {calculateSameDayFee(amount) === 0 && amount >= 1000 && (
                <span className="free-badge">FREE DELIVERY!</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .delivery-test-page {
          padding: 2rem 0;
        }
        
        .test-section {
          margin: 2rem 0;
          padding: 1.5rem;
          border: 1px solid var(--border-light);
          border-radius: 12px;
          background: var(--surface-primary);
        }
        
        .status-grid,
        .options-grid,
        .calculator-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .status-card,
        .option-card,
        .calculator-card {
          padding: 1rem;
          border: 1px solid var(--border-light);
          border-radius: 8px;
          background: var(--surface-secondary);
        }
        
        .status.available {
          color: var(--primary-green);
          font-weight: 600;
        }
        
        .status.unavailable {
          color: #ef4444;
          font-weight: 600;
        }
        
        .option-card.same-day {
          border-color: #f59e0b;
          background: rgba(245, 158, 11, 0.05);
        }
        
        .free-badge {
          display: inline-block;
          background: var(--primary-green);
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 700;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
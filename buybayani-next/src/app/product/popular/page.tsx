import React from "react";

export default function PopularProductPage() {
  return (
    <main className="product-page container">
      <div className="product-detail">
        <div className="product-media">
          <div className="media-placeholder">
            {/* Replace this div with an Image component later. The box is fixed to avoid overflow. */}
            <div className="media-img">Photo placeholder</div>
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-name">Potato (Fresh)</h1>

          <div className="product-meta">
            <div className="certifications">
              <strong>Certifications:</strong>
              <div className="cert-list">
                <span className="cert-badge bafps-certified">BAFPS Certified</span>
                <span className="cert-badge">BPI Seed Grower</span>
              </div>
            </div>

            <div className="price"><strong>Price:</strong> ₱85 / kg</div>
            <div className="farm"><strong>Farm:</strong> San Miguel Farm</div>
            <div className="delivery"><strong>Delivery:</strong> Metro Manila — 2-3 days</div>
          </div>

          <div className="purchase-panel">
            <label htmlFor="quantity">Quantity</label>
            <input id="quantity" type="number" min={1} defaultValue={1} className="quantity-box" />

            <div className="purchase-actions">
              <button className="btn-primary">Buy Now</button>
              <button className="btn-secondary">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

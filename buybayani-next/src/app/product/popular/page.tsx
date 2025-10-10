import React from "react";
import Image from "next/image";

export default function PopularProductPage() {
  return (
    <main className="product-page container">
      <div className="product-detail">
        <div className="product-media">
          <div className="media-placeholder">
            <Image src="/potatoes.jpg" alt="Potato" fill className="detail-image" priority />
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

      {/* Horizontal scrollers */}
      <section className="horizontal-section">
        <h3 className="section-title">From the same Farm</h3>
        <div className="scroller" aria-label="Other products from this farm">
          {[
            { name: "Baby Potatoes", price: "₱90 / kg" },
            { name: "Sweet Potatoes", price: "₱75 / kg" },
            { name: "Red Potatoes", price: "₱88 / kg" },
            { name: "Potato Chips (Raw)", price: "₱150 / pack" },
            { name: "Seed Potatoes", price: "₱120 / kg" },
            { name: "Organic Potatoes", price: "₱140 / kg" },
          ].map((p, i) => (
            <article key={i} className="small-card">
              <div className="small-media">
                <div className="small-placeholder">Image</div>
              </div>
              <div className="small-info">
                <div className="small-title">{p.name}</div>
                <div className="small-price">{p.price}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="horizontal-section">
        <h3 className="section-title">Produces you may like</h3>
        <div className="scroller" aria-label="Recommended products">
          {[
            { name: "Tomato (Red)", price: "₱120 / kg" },
            { name: "Eggplant", price: "₱70 / kg" },
            { name: "Sweet Corn", price: "₱60 / ear" },
            { name: "Cabbage", price: "₱55 / head" },
            { name: "Carrots", price: "₱80 / kg" },
            { name: "Green Beans", price: "₱95 / kg" },
            { name: "Onions", price: "₱65 / kg" },
            { name: "Garlic", price: "₱220 / kg" },
          ].map((p, i) => (
            <article key={i} className="small-card">
              <div className="small-media">
                <div className="small-placeholder">Image</div>
              </div>
              <div className="small-info">
                <div className="small-title">{p.name}</div>
                <div className="small-price">{p.price}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

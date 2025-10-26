import Image from "next/image";
import Link from "next/link";
import React from "react";
import { isProductEligibleForSameDay, getSameDayDeliveryETA } from "../utils/delivery";

export type Certificate = "BPI Seed Grower" | "BAFPS Certified" | "Certified Organic Farm";

export default function ProductCard({
  title,
  price,
  imageSrc,
  certificates = [],
  href,
}: {
  title: string;
  price: string;
  imageSrc?: string;
  certificates?: Certificate[];
  href?: string;
}) {
  const sameDayEligible = isProductEligibleForSameDay();
  const deliveryETA = sameDayEligible ? getSameDayDeliveryETA() : null;

  return (
    <article className="product-card" aria-label={title}>
      <div className="product-image">
        {imageSrc ? (
          <Image src={imageSrc} alt={title} width={400} height={300} style={{ objectFit: "cover" }} />
        ) : (
          <div className="placeholder">No image</div>
        )}
        {sameDayEligible && (
          <div className="same-day-badge">
            <span className="same-day-label">Same-Day Available</span>
            <span className="same-day-time">{deliveryETA}</span>
          </div>
        )}
      </div>
      <div className="product-body">
        <h3 className="product-title">{title}</h3>
        <div className="product-price">{price}</div>

        {sameDayEligible && (
          <div className="same-day-info">
            <span className="same-day-fee">+₱150 for same-day delivery</span>
          </div>
        )}

        <div className="certificates">
          {certificates.length === 0 && <span className="cert-none">No certifications</span>}
          {certificates.map((c) => (
            <span key={c} className={`cert-badge ${c.replace(/\s+/g, "-").toLowerCase()}`} title={c}>
              {c}
            </span>
          ))}
        </div>

        <div className="product-actions">
          <button className="btn-primary">Add to cart</button>
          {href ? (
            <Link href={href} className="btn-secondary">View</Link>
          ) : (
            <button className="btn-secondary">View</button>
          )}
        </div>
      </div>
    </article>
  );
}

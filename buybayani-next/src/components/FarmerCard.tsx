import Image from "next/image";
import React from "react";

export type FarmerCertification = "BAFPS Certified" | "Certified Organic Farm" | "BPI Seed Grower" | "Rainforest Alliance" | "Good Agricultural Practice";

export interface Farmer {
  id: string;
  name: string;
  farmName: string;
  image: string;
  certifications: FarmerCertification[];
  produce: string[];
  quote: string;
  email: string;
  phone: string;
}

export default function FarmerCard({ farmer }: { farmer: Farmer }) {
  return (
    <article className="farmer-card" aria-label={`${farmer.farmName} farmer profile`}>
      <div className="farmer-image">
        <Image 
          src={farmer.image} 
          alt={`${farmer.name} from ${farmer.farmName}`}
          width={320}
          height={240}
          style={{ objectFit: "cover" }}
        />
      </div>
      
      <div className="farmer-body">
        <div className="farmer-header">
          <h3 className="farm-name">{farmer.farmName}</h3>
          <p className="farmer-name">by {farmer.name}</p>
          <div className="farmer-contact">
            <p className="farmer-email">{farmer.email}</p>
            <p className="farmer-phone">{farmer.phone}</p>
          </div>
        </div>

        <div className="farmer-certifications">
          {farmer.certifications.map((cert) => (
            <span 
              key={cert} 
              className={`cert-badge ${cert.replace(/\s+/g, "-").toLowerCase()}`}
              title={cert}
            >
              {cert}
            </span>
          ))}
        </div>

        <div className="farmer-produce">
          <strong>Specializes in:</strong>
          <div className="produce-list">
            {farmer.produce.map((item, index) => (
              <span key={item} className="produce-item">
                {item}
                {index < farmer.produce.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>

        <blockquote className="farmer-quote">
          <p>&ldquo;{farmer.quote}&rdquo;</p>
          <cite>— {farmer.name}</cite>
        </blockquote>
      </div>
    </article>
  );
}
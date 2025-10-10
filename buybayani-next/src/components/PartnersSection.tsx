import React from "react";
import FarmerCard, { type Farmer } from "./FarmerCard";

const PARTNER_FARMERS: Farmer[] = [
  {
    id: "1",
    name: "Maria Santos",
    farmName: "Santos Family Farm",
    image: "/farmer-maria.svg",
    certifications: ["BAFPS Certified", "Certified Organic Farm"],
    produce: ["Tomatoes", "Eggplant", "Bell Peppers", "Okra"],
    quote: "We've been growing organic vegetables for three generations. Quality and sustainability are our priorities.",
    email: "maria@santosfarm.ph",
    phone: "+63 917 123 4567"
  },
  {
    id: "2", 
    name: "Juan Dela Cruz",
    farmName: "Mountainview Organic Farm",
    image: "/farmer-juan.svg",
    certifications: ["Certified Organic Farm", "Rainforest Alliance"],
    produce: ["Sweet Corn", "Lettuce", "Carrots", "Green Beans"],
    quote: "Farming isn't just our livelihood—it's our way of nourishing our community with the freshest produce.",
    email: "juan@mountainviewfarm.ph",
    phone: "+63 926 987 6543"
  },
  {
    id: "3",
    name: "Rosa Magbanua", 
    farmName: "Sunrise Vegetable Garden",
    image: "/farmer-rosa.svg",
    certifications: ["BAFPS Certified", "Good Agricultural Practice"],
    produce: ["Potatoes", "Onions", "Cabbage", "Radish"],
    quote: "Every harvest tells a story of hard work, patience, and love for the land that feeds us all.",
    email: "rosa@sunrisegarden.ph",
    phone: "+63 935 456 7890"
  },
  {
    id: "4",
    name: "Roberto Fernandez",
    farmName: "Green Valley Farms",
    image: "/farmer-roberto.svg",
    certifications: ["BPI Seed Grower", "BAFPS Certified"],
    produce: ["Rice", "Coconut", "Banana", "Papaya"],
    quote: "Traditional methods combined with modern techniques help us grow the healthiest crops for Filipino families.",
    email: "roberto@greenvalleyfarms.ph",
    phone: "+63 918 234 5678"
  }
];

export default function PartnersSection({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section id="partners" className="partners-section">
      {showHeader && (
        <div className="partners-header">
          <h2>Our Partner Farmers</h2>
          <p className="section-subtitle">
            Meet the dedicated Filipino farmers who bring fresh, certified produce directly to your table
          </p>
        </div>
      )}

      <div className="farmers-grid">
        {PARTNER_FARMERS.map((farmer) => (
          <FarmerCard key={farmer.id} farmer={farmer} />
        ))}
      </div>

      <div className="partners-cta">
        <p>Interested in becoming a partner farmer?</p>
        <button className="btn-secondary">Join Our Network</button>
      </div>
    </section>
  );
}
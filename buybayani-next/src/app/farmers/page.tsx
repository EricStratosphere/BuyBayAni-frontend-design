import PartnersSection from "../../components/PartnersSection";

export default function FarmersPage() {
  return (
    <div className="farmers-page">
      <div className="page-header">
        <h1>Our Partner Farmers</h1>
        <p className="page-subtitle">
          Meet the dedicated Filipino farmers who bring fresh, certified produce directly to your table. 
          Each farmer in our network is committed to sustainable agriculture and quality produce.
        </p>
      </div>

      <PartnersSection showHeader={false} />
    </div>
  );
}
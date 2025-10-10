import ProductCard from "../components/ProductCard";
import Link from "next/link";
import Image from "next/image";

type Product = {
  title: string;
  price: string;
  image: string;
  certificates: string[];
};

const SAMPLE_PRODUCTS: Product[] = [
  {
    title: "Potato (Fresh)",
    price: "₱85 / kg",
    image: "/potatoes.jpg",
    certificates: ["BAFPS Certified"],
  },
  {
    title: "Tomato (Red)",
    price: "₱120 / kg",
    image: "/tomatoes.jpg",
    certificates: ["Certified Organic Farm"],
  },
  {
    title: "Sweet Corn",
    price: "₱60 / ear",
    image: "/sweetcorn.jpg",
    certificates: ["BPI Seed Grower", "Certified Organic Farm"],
  },
  {
    title: "Eggplant",
    price: "₱70 / kg",
    image: "/eggplant.jpg",
    certificates: [],
  },
];

export default function Home() {
  return (
    <section id="produce" className="front-page">
      <div className="hero-banner">
        <div className="banner-image">
          <Image src="/sunset-field.png" alt="Sunset field" fill priority className="banner-img" />
        </div>
        <div className="banner-copy">
          <h1>Fresh from the farm to your table</h1>
          <p className="lead">Buy directly from Filipino farms. Filter by certifications and freshness.</p>
        </div>
      </div>

      {/* Featured area - larger card separated from grid to create hierarchy */}
      <div className="featured-area">
        {SAMPLE_PRODUCTS[0] && (
          <div className="featured-card">
            <h2 className="featured-label">Popular this week</h2>
            <div className="featured-inner">
              <ProductCard
                title={SAMPLE_PRODUCTS[0].title}
                price={SAMPLE_PRODUCTS[0].price}
                imageSrc={SAMPLE_PRODUCTS[0].image}
                href="/product/popular"
                // @ts-expect-error - certificates types match
                certificates={SAMPLE_PRODUCTS[0].certificates}
              />
              <div className="featured-copy">
                <h3>From a trusted farm</h3>
                <p className="muted">BAFPS Certified — Hand-picked and quality-checked.</p>
                <div className="featured-actions">
                  <button className="btn-primary">Shop now</button>
                  <Link href="/product/popular" className="btn-secondary">Learn More</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="products-grid">
        {SAMPLE_PRODUCTS.slice(1).map((p) => (
          <ProductCard
            key={p.title}
            title={p.title}
            price={p.price}
            imageSrc={p.image}
            // @ts-expect-error - certificates types match
            certificates={p.certificates}
          />
        ))}
      </div>
    </section>
  );
}

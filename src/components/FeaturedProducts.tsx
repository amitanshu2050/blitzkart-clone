import ProductCard from "./ProductCard";
import { allProducts } from "@/data/products";
import { Link } from "react-router-dom";

const featured = allProducts.filter((p) => p.discount).slice(0, 8);

const FeaturedProducts = () => {
  return (
    <section className="py-12 sm:py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold">Best Sellers 🔥</h2>
          <Link to="/products" className="text-sm text-primary font-medium hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((p) => (
            <ProductCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

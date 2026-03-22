import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { allProducts, categories } from "@/data/products";
import { motion } from "framer-motion";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";
  const searchParam = searchParams.get("q") || "";
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  const filtered = allProducts.filter((p) => {
    const matchCategory = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = searchParam
      ? p.name.toLowerCase().includes(searchParam.toLowerCase()) ||
        p.category.toLowerCase().includes(searchParam.toLowerCase())
      : true;
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {searchParam && (
          <div className="mb-6">
            <p className="text-lg">
              Showing results for "<span className="font-semibold">{searchParam}</span>"
              <span className="text-muted-foreground"> ({filtered.length} items)</span>
            </p>
          </div>
        )}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors font-body ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <h2 className="text-xl font-heading font-bold mb-2">No products found</h2>
            <p className="text-muted-foreground mb-4">Try a different search or category</p>
            <Link to="/" className="text-primary hover:underline">← Back to home</Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.name} {...p} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Products;

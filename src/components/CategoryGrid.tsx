import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categoryImages: Record<string, string> = {
  "Grocery & Kitchen": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
  "Snacks & Drinks": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop",
  "Household Items": "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
  "Electronics": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
  "Beauty Products": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
};

const categories = [
  { name: "Grocery & Kitchen" },
  { name: "Snacks & Drinks" },
  { name: "Household Items" },
  { name: "Electronics" },
  { name: "Beauty Products" },
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
              className="relative rounded-xl overflow-hidden cursor-pointer group aspect-square"
            >
              <img
                src={categoryImages[cat.name]}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <span className="text-white font-heading font-semibold text-sm sm:text-base">{cat.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;

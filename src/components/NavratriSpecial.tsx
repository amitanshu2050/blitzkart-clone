import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const navratriProducts = [
  { name: "Puja Thali Set", price: 249, originalPrice: 399, unit: "1 set", image: "https://images.unsplash.com/photo-1604423042409-6a888d83a5b4?w=200&h=200&fit=crop", discount: 38, category: "Navratri Special" },
  { name: "Agarbatti Pack", price: 49, originalPrice: 79, unit: "100 sticks", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop", discount: 38, category: "Navratri Special" },
  { name: "Pure Desi Ghee", price: 299, originalPrice: 450, unit: "500ml", image: "https://images.unsplash.com/photo-1631209121750-a9f656d28536?w=200&h=200&fit=crop", discount: 34, category: "Navratri Special" },
  { name: "Camphor Tablets", price: 35, originalPrice: 55, unit: "50g", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop", discount: 36, category: "Navratri Special" },
  { name: "Puja Coconut", price: 30, originalPrice: 45, unit: "1 pc", image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=200&h=200&fit=crop", discount: 33, category: "Navratri Special" },
  { name: "Besan Ladoo Box", price: 199, originalPrice: 320, unit: "500g", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&h=200&fit=crop", discount: 38, category: "Navratri Special" },
  { name: "Kumkum & Roli Set", price: 25, originalPrice: 40, unit: "1 set", image: "https://images.unsplash.com/photo-1604423042409-6a888d83a5b4?w=200&h=200&fit=crop", discount: 38, category: "Navratri Special" },
  { name: "Brass Diya Set", price: 149, originalPrice: 249, unit: "4 pcs", image: "https://images.unsplash.com/photo-1604423042409-6a888d83a5b4?w=200&h=200&fit=crop", discount: 40, category: "Navratri Special" },
  { name: "Marigold Garland", price: 45, originalPrice: 70, unit: "1 string", image: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop", discount: 36, category: "Navratri Special" },
  { name: "Haldi Powder", price: 39, originalPrice: 60, unit: "100g", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200&h=200&fit=crop", discount: 35, category: "Navratri Special" },
];

const NavratriSpecial = () => {
  const eventEnd = new Date("2026-03-27T23:59:59");
  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((eventEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  if (daysLeft <= 0) return null;

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-red-500/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🕉️</span>
          <span className="text-sm text-accent font-medium">Ends March 27 • {daysLeft} day{daysLeft !== 1 ? "s" : ""} left</span>
          <span className="text-2xl">🕉️</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-2">Navratri Special 🪔</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl">
          Celebrate the nine divine nights with special deals on puja essentials, sweets, and festive must-haves!
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8"
        >
          🎊 Up to 40% OFF + Free Delivery
        </motion.div>
        <p className="text-xs text-muted-foreground mb-6">On all puja essentials • Free delivery on every order till Mar 27</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {navratriProducts.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <ProductCard {...p} />
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/products" className="text-sm text-primary font-medium hover:underline">
            View All Navratri Deals →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NavratriSpecial;

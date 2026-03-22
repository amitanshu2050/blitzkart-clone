import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-brand-lime/5 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Clock className="h-4 w-4" />
              Delivery in <strong>10 minutes</strong>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
              Groceries at lightning{" "}
              <span className="text-primary">speed</span> ⚡
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              From fresh produce to daily essentials — everything delivered to your door faster than you can say "BlitzKart".
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="gap-2 text-base">
                  <Zap className="h-5 w-5" />
                  Order Now
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="text-base">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-brand-lime/20 flex items-center justify-center">
              <div className="text-8xl">🛒</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

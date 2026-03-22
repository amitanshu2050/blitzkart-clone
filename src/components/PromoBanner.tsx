import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PromoBanner = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-brand-speed p-8 sm:p-12"
        >
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-4">
              <Zap className="h-3.5 w-3.5" />
              LIMITED OFFER
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
              Get ₹100 off on your first order
            </h3>
            <p className="text-white/80 mb-6">
              Use code <span className="font-bold text-white">BLITZ100</span> at checkout. Min order ₹299.
            </p>
            <Link to="/products">
              <Button size="lg" variant="secondary" className="font-semibold">
                Claim Offer
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner;

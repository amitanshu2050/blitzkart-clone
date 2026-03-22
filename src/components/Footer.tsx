import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-heading font-bold text-lg">BlitzKart</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Groceries at lightning speed. Delivery in 10 minutes.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/products" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Products</Link>
              <Link to="/cart" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Cart</Link>
              <Link to="/orders" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">My Orders</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Management</h4>
            <div className="space-y-2">
              <Link to="/inventory" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Inventory</Link>
              <Link to="/dispatch" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Dispatch</Link>
              <Link to="/admin" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Admin</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Support</h4>
            <div className="space-y-2">
              <span className="block text-sm text-muted-foreground">help@blitzkart.com</span>
              <span className="block text-sm text-muted-foreground">+91 98765 43210</span>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BlitzKart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

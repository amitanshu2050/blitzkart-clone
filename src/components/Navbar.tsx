import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, User, Package, Truck, Sun, Moon, LogOut, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { allProducts } from "@/data/products";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Toggle theme">
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  const initials = user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors"
      >
        <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
          {initials}
        </div>
        <span className="hidden md:block text-sm font-medium">{user.name.split(" ")[0]}</span>
        <ChevronDown className="h-3.5 w-3.5 hidden md:block text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-64 bg-card border rounded-xl shadow-lg z-50 p-2">
          <div className="flex items-center gap-3 px-3 py-3 border-b mb-1">
            <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
              {initials}
            </div>
            <div>
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <p className="px-3 py-1 text-xs text-muted-foreground">{user.role === "admin" ? "Administrator" : "Customer"}</p>
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
          >
            <User className="h-4 w-4" />
            My Profile
          </Link>
          <Link
            to="/orders"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
          >
            <Package className="h-4 w-4" />
            My Orders
          </Link>
          {user.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
            >
              <Truck className="h-4 w-4" />
              Admin Dashboard
            </Link>
          )}
          <div className="border-t mt-1 pt-1">
            <button
              onClick={() => { logout(); setOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const results = query.trim().length > 0
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setShowResults(false);
    }
  };

  const handleSelect = (name: string) => {
    navigate(`/products?q=${encodeURIComponent(name)}`);
    setQuery("");
    setShowResults(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">⚡</span>
            </div>
            <span className="font-heading font-bold text-lg hidden sm:block">BlitzKart</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl relative">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
                  onFocus={() => setShowResults(true)}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                  className="pl-10 h-10"
                />
              </div>
            </form>
            {showResults && results.length > 0 && (
              <div className="absolute top-12 w-full bg-card border rounded-xl shadow-lg z-50 overflow-hidden">
                {results.map((p) => (
                  <button
                    key={p.name}
                    onMouseDown={() => handleSelect(p.name)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors text-left"
                  >
                    <img src={p.image} alt={p.name} className="h-8 w-8 rounded object-cover" />
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">₹{p.price} · {p.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground">
                  {totalItems}
                </Badge>
              )}
            </Link>
            {isLoggedIn ? (
              <ProfileDropdown />
            ) : (
              <Link to="/login">
                <Button size="sm" className="gap-1.5">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

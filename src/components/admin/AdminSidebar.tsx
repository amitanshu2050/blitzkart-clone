import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Search,
  Boxes,
  Truck,
  MapPin,
  TrendingUp,
  Settings,
  Zap,
  LogOut,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const AdminSidebarUser = () => {
  const { user } = useAuth();
  const displayName = user?.name || "Admin User";
  const initials = displayName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="flex items-center gap-3 px-4 py-4 border-b border-sidebar-border">
      <div className="h-10 w-10 rounded-full bg-sidebar-primary/20 text-sidebar-primary flex items-center justify-center text-sm font-bold">
        {initials}
      </div>
      <div>
        <p className="text-sm font-semibold text-sidebar-foreground">{displayName}</p>
        <p className="text-xs text-sidebar-foreground/60">{user?.role === "admin" ? "Super Admin" : "User"}</p>
      </div>
    </div>
  );
};

const navSections = [
  {
    label: "OVERVIEW",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
      { icon: ClipboardList, label: "Orders", path: "/admin/orders", badge: 24 },
    ],
  },
  {
    label: "COMMERCE",
    items: [
      { icon: Package, label: "Products", path: "/admin/products" },
      { icon: Search, label: "Sellers", path: "/admin/sellers", badge: 3 },
      { icon: Boxes, label: "Inventory", path: "/admin/inventory" },
    ],
  },
  {
    label: "LOGISTICS",
    items: [
      { icon: Truck, label: "Delivery", path: "/admin/delivery" },
      { icon: MapPin, label: "Coverage Map", path: "/admin/coverage" },
      { icon: TrendingUp, label: "Analytics", path: "/admin/analytics" },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { icon: Settings, label: "Settings", path: "/admin/settings" },
    ],
  },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-sidebar-border">
        <div className="h-8 w-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
          <Zap className="h-4 w-4 text-sidebar-primary-foreground" />
        </div>
        <span className="font-heading font-bold text-sidebar-foreground">BlitzKart</span>
        <Badge className="ml-auto bg-sidebar-primary/20 text-sidebar-primary text-[10px]">Admin</Badge>
      </div>

      <AdminSidebarUser />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navSections.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="px-4 mb-2 text-[10px] font-bold tracking-widest text-sidebar-foreground/40 uppercase">
              {section.label}
            </p>
            {section.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {"badge" in item && item.badge && (
                    <Badge className="ml-auto h-5 px-1.5 text-[10px] bg-sidebar-primary/20 text-sidebar-primary">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <Link to="/" className="flex items-center gap-2 text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors mb-2 px-2">
          ← Back to Store
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-2 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

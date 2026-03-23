import { useState, useMemo } from "react";
import {
  Search,
  LayoutGrid,
  List,
  Star,
  MapPin,
  Package,
  ShoppingCart,
  Clock,
  Mail,
  Phone,
  Zap,
  TrendingUp,
  Navigation,
  Users,
  UserCheck,
  UserX,
  UserPlus,
  ChevronDown,
  ChevronRight,
  ShoppingBasket,
  Cpu,
  Shirt,
  Sparkles,
  Pill,
  Home,
  Coffee,
  ArrowUpDown,
  Eye,
  Shield,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSellers, sellerCategories, type Seller, type SellerCategory, type SellerStatus } from "@/data/mockSellers";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const categoryIcons: Record<string, React.ReactNode> = {
  ShoppingBasket: <ShoppingBasket className="h-4 w-4" />,
  Cpu: <Cpu className="h-4 w-4" />,
  Shirt: <Shirt className="h-4 w-4" />,
  Sparkles: <Sparkles className="h-4 w-4" />,
  Pill: <Pill className="h-4 w-4" />,
  Home: <Home className="h-4 w-4" />,
  Coffee: <Coffee className="h-4 w-4" />,
};

const statusConfig: Record<SellerStatus, { label: string; class: string }> = {
  active: { label: "Active", class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  pending: { label: "Pending", class: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  suspended: { label: "Suspended", class: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${color}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const QuickBadges = ({ seller }: { seller: Seller }) => (
  <div className="flex flex-wrap gap-1.5 mt-2">
    {seller.isFastDelivery && (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
        <Zap className="h-3 w-3" /> Fast
      </span>
    )}
    {seller.isNearby && (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
        <Navigation className="h-3 w-3" /> Nearby
      </span>
    )}
    {seller.isHighDemand && (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
        <TrendingUp className="h-3 w-3" /> High Demand
      </span>
    )}
  </div>
);

const SellerCard = ({ seller, onAction }: { seller: Seller; onAction: (id: string, action: string) => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.2 }}
  >
    <Card className="border border-border/50 shadow-sm hover:shadow-md transition-all hover:border-primary/20 group">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <Avatar className="h-12 w-12 rounded-xl border-2 border-primary/20">
            <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-bold text-sm">
              {seller.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm truncate">{seller.storeName}</h3>
              <Badge className={`text-[10px] px-1.5 py-0 h-5 border-0 ${statusConfig[seller.status].class}`}>
                {statusConfig[seller.status].label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{seller.ownerName}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin className="h-3 w-3" />
              {seller.location}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < Math.floor(seller.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
            />
          ))}
          <span className="text-xs font-medium ml-1">{seller.rating}</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <Package className="h-3.5 w-3.5 mx-auto text-muted-foreground mb-1" />
            <p className="text-xs font-bold">{seller.totalProducts}</p>
            <p className="text-[10px] text-muted-foreground">Products</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <ShoppingCart className="h-3.5 w-3.5 mx-auto text-muted-foreground mb-1" />
            <p className="text-xs font-bold">{seller.ordersCompleted.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">Orders</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <Clock className="h-3.5 w-3.5 mx-auto text-muted-foreground mb-1" />
            <p className="text-xs font-bold">{seller.deliveryTime}</p>
            <p className="text-[10px] text-muted-foreground">Delivery</p>
          </div>
        </div>

        <QuickBadges seller={seller} />

        {/* Contact */}
        <div className="mt-3 pt-3 border-t border-border/50 space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span className="truncate">{seller.email}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span>{seller.phone}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="outline" className="flex-1 h-8 text-xs" onClick={() => onAction(seller.id, "view")}>
            <Eye className="h-3 w-3 mr-1" /> View Details
          </Button>
          {seller.status === "pending" ? (
            <Button size="sm" className="flex-1 h-8 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={() => onAction(seller.id, "approve")}>
              <CheckCircle2 className="h-3 w-3 mr-1" /> Approve
            </Button>
          ) : seller.status === "active" ? (
            <Button size="sm" variant="destructive" className="flex-1 h-8 text-xs" onClick={() => onAction(seller.id, "suspend")}>
              <XCircle className="h-3 w-3 mr-1" /> Suspend
            </Button>
          ) : (
            <Button size="sm" className="flex-1 h-8 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={() => onAction(seller.id, "reactivate")}>
              <CheckCircle2 className="h-3 w-3 mr-1" /> Reactivate
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const AdminSellers = () => {
  const [sellers, setSellers] = useState<Seller[]>(mockSellers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(sellerCategories.map(c => [c.label, true]))
  );

  const stats = useMemo(() => ({
    total: sellers.length,
    active: sellers.filter(s => s.status === "active").length,
    pending: sellers.filter(s => s.status === "pending").length,
    suspended: sellers.filter(s => s.status === "suspended").length,
  }), [sellers]);

  const filteredSellers = useMemo(() => {
    let result = [...sellers];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.storeName.toLowerCase().includes(q) ||
        s.ownerName.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") result = result.filter(s => s.status === statusFilter);
    if (categoryFilter !== "all") result = result.filter(s => s.category === categoryFilter);
    
    result.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "orders") return b.ordersCompleted - a.ordersCompleted;
      if (sortBy === "products") return b.totalProducts - a.totalProducts;
      return a.storeName.localeCompare(b.storeName);
    });
    return result;
  }, [sellers, searchQuery, statusFilter, categoryFilter, sortBy]);

  const sellersByCategory = useMemo(() => {
    const map: Record<string, Seller[]> = {};
    sellerCategories.forEach(c => { map[c.label] = []; });
    filteredSellers.forEach(s => {
      if (map[s.category]) map[s.category].push(s);
    });
    return map;
  }, [filteredSellers]);

  const handleAction = (id: string, action: string) => {
    if (action === "view") {
      toast.info("Seller details panel coming soon!");
      return;
    }
    setSellers(prev => prev.map(s => {
      if (s.id !== id) return s;
      if (action === "approve" || action === "reactivate") return { ...s, status: "active" as SellerStatus };
      if (action === "suspend") return { ...s, status: "suspended" as SellerStatus };
      return s;
    }));
    toast.success(`Seller ${action === "approve" ? "approved" : action === "suspend" ? "suspended" : "reactivated"} successfully!`);
  };

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Sellers Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and monitor all seller accounts across categories</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" /> Add Seller
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Sellers" value={stats.total} color="bg-primary/10 text-primary" />
        <StatCard icon={UserCheck} label="Active" value={stats.active} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard icon={Shield} label="Pending Approval" value={stats.pending} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
        <StatCard icon={UserX} label="Suspended" value={stats.suspended} color="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" />
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sellers by name, owner, or location..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {sellerCategories.map(c => (
                  <SelectItem key={c.label} value={c.label}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[160px]">
                <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="orders">Orders</SelectItem>
                <SelectItem value="products">Products</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "card" ? "default" : "ghost"}
                size="icon"
                className="rounded-none h-10 w-10"
                onClick={() => setViewMode("card")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="icon"
                className="rounded-none h-10 w-10"
                onClick={() => setViewMode("table")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="all">All Sellers ({filteredSellers.length})</TabsTrigger>
        </TabsList>

        {/* Category View */}
        <TabsContent value="categories" className="space-y-3">
          {sellerCategories.map(cat => {
            const catSellers = sellersByCategory[cat.label] || [];
            if (catSellers.length === 0 && (categoryFilter !== "all" && categoryFilter !== cat.label)) return null;
            return (
              <Collapsible
                key={cat.label}
                open={openCategories[cat.label]}
                onOpenChange={() => toggleCategory(cat.label)}
              >
                <Card className="border-0 shadow-sm overflow-hidden">
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="py-4 px-5 hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            {categoryIcons[cat.icon]}
                          </div>
                          <div className="text-left">
                            <CardTitle className="text-sm font-semibold">{cat.label}</CardTitle>
                            <p className="text-xs text-muted-foreground">{catSellers.length} seller{catSellers.length !== 1 ? "s" : ""}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-[10px]">
                            {catSellers.filter(s => s.status === "active").length} active
                          </Badge>
                          {catSellers.filter(s => s.status === "pending").length > 0 && (
                            <Badge className="text-[10px] bg-amber-100 text-amber-700 border-0 dark:bg-amber-900/30 dark:text-amber-400">
                              {catSellers.filter(s => s.status === "pending").length} pending
                            </Badge>
                          )}
                          {openCategories[cat.label] ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="px-5 pb-5 pt-0">
                      {catSellers.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">No sellers found in this category</p>
                      ) : viewMode === "card" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                          <AnimatePresence>
                            {catSellers.map(seller => (
                              <SellerCard key={seller.id} seller={seller} onAction={handleAction} />
                            ))}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <SellerTableView sellers={catSellers} onAction={handleAction} />
                      )}
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            );
          })}
        </TabsContent>

        {/* All Sellers View */}
        <TabsContent value="all">
          {viewMode === "card" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredSellers.map(seller => (
                  <SellerCard key={seller.id} seller={seller} onAction={handleAction} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                <SellerTableView sellers={filteredSellers} onAction={handleAction} />
              </CardContent>
            </Card>
          )}
          {filteredSellers.length === 0 && (
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No sellers match your filters</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const SellerTableView = ({ sellers, onAction }: { sellers: Seller[]; onAction: (id: string, action: string) => void }) => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Seller</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead className="text-right">Products</TableHead>
          <TableHead className="text-right">Orders</TableHead>
          <TableHead>Delivery</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Indicators</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sellers.map(seller => (
          <TableRow key={seller.id} className="group">
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-xs font-bold">
                    {seller.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{seller.storeName}</p>
                  <p className="text-xs text-muted-foreground">{seller.ownerName}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-sm">{seller.location}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium">{seller.rating}</span>
              </div>
            </TableCell>
            <TableCell className="text-right text-sm">{seller.totalProducts}</TableCell>
            <TableCell className="text-right text-sm">{seller.ordersCompleted.toLocaleString()}</TableCell>
            <TableCell className="text-sm">{seller.deliveryTime}</TableCell>
            <TableCell>
              <Badge className={`text-[10px] border-0 ${statusConfig[seller.status].class}`}>
                {statusConfig[seller.status].label}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                {seller.isFastDelivery && <Zap className="h-3.5 w-3.5 text-primary" />}
                {seller.isNearby && <Navigation className="h-3.5 w-3.5 text-blue-500" />}
                {seller.isHighDemand && <TrendingUp className="h-3.5 w-3.5 text-orange-500" />}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => onAction(seller.id, "view")}>
                  <Eye className="h-3 w-3" />
                </Button>
                {seller.status === "pending" ? (
                  <Button size="sm" className="h-7 px-2 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={() => onAction(seller.id, "approve")}>
                    Approve
                  </Button>
                ) : seller.status === "active" ? (
                  <Button size="sm" variant="destructive" className="h-7 px-2 text-xs" onClick={() => onAction(seller.id, "suspend")}>
                    Suspend
                  </Button>
                ) : (
                  <Button size="sm" className="h-7 px-2 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={() => onAction(seller.id, "reactivate")}>
                    Reactivate
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default AdminSellers;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, Package, Truck, TrendingUp, DollarSign, Users, ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "₹4,52,800", change: "+12.5%", icon: DollarSign, color: "text-primary" },
  { label: "Orders Today", value: "186", change: "+8.2%", icon: ShoppingCart, color: "text-blue-500" },
  { label: "Active Deliveries", value: "24", change: "-3.1%", icon: Truck, color: "text-amber-500" },
  { label: "New Customers", value: "42", change: "+18.7%", icon: Users, color: "text-purple-500" },
];

const recentOrders = [
  { id: "ORD-2847", customer: "Priya Sharma", items: 5, total: "₹1,240", status: "Preparing", time: "2 min ago" },
  { id: "ORD-2846", customer: "Amit Patel", items: 3, total: "₹680", status: "Out for Delivery", time: "8 min ago" },
  { id: "ORD-2845", customer: "Sneha Gupta", items: 8, total: "₹2,150", status: "Delivered", time: "15 min ago" },
  { id: "ORD-2844", customer: "Rahul Singh", items: 2, total: "₹340", status: "Confirmed", time: "22 min ago" },
  { id: "ORD-2843", customer: "Meera Joshi", items: 6, total: "₹1,890", status: "Preparing", time: "30 min ago" },
];

const statusColor: Record<string, string> = {
  Confirmed: "bg-blue-500/10 text-blue-600",
  Preparing: "bg-amber-500/10 text-amber-600",
  "Out for Delivery": "bg-primary/10 text-primary",
  Delivered: "bg-green-500/10 text-green-600",
};

const AdminDashboard = () => (
  <div>
    <h1 className="text-3xl font-heading font-bold mb-2">Dashboard</h1>
    <p className="text-muted-foreground mb-8">Welcome back, here's what's happening today.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" />{stat.change} <span>vs yesterday</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
    <Card>
      <CardHeader><CardTitle>Recent Orders</CardTitle></CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead><TableHead>Customer</TableHead><TableHead>Items</TableHead><TableHead>Total</TableHead><TableHead>Status</TableHead><TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs font-bold">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell><Badge className={statusColor[order.status]}>{order.status}</Badge></TableCell>
                <TableCell className="text-xs text-muted-foreground">{order.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

export default AdminDashboard;

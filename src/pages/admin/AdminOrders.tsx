import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";
const AdminOrders = () => (<div><h1 className="text-3xl font-heading font-bold mb-6">Orders</h1><Card><CardHeader><CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5" />All Orders</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Order management interface — view, filter, and manage all customer orders.</p></CardContent></Card></div>);
export default AdminOrders;

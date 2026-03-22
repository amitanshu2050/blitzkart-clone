import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
const AdminSellers = () => (<div><h1 className="text-3xl font-heading font-bold mb-6">Sellers</h1><Card><CardHeader><CardTitle className="flex items-center gap-2"><Search className="h-5 w-5" />Seller Management</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">View and manage seller accounts, approvals, and performance metrics.</p></CardContent></Card></div>);
export default AdminSellers;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
const AdminProducts = () => (<div><h1 className="text-3xl font-heading font-bold mb-6">Products</h1><Card><CardHeader><CardTitle className="flex items-center gap-2"><Package className="h-5 w-5" />Product Catalog</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Manage your product catalog — add, edit, and organize products across categories.</p></CardContent></Card></div>);
export default AdminProducts;

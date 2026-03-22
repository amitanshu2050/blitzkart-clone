import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck } from "lucide-react";
const AdminDelivery = () => (<div><h1 className="text-3xl font-heading font-bold mb-6">Delivery</h1><Card><CardHeader><CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5" />Delivery Management</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Track active deliveries, assign riders, and manage delivery zones.</p></CardContent></Card></div>);
export default AdminDelivery;

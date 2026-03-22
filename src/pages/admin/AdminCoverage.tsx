import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
const AdminCoverage = () => (<div><h1 className="text-3xl font-heading font-bold mb-6">Coverage Map</h1><Card><CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" />Service Coverage</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">View and configure delivery coverage areas, pin codes, and service zones.</p></CardContent></Card></div>);
export default AdminCoverage;

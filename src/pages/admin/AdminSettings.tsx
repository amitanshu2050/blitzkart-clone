import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
const AdminSettings = () => (<div><h1 className="text-3xl font-heading font-bold mb-6">Settings</h1><Card><CardHeader><CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5" />System Settings</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Configure store settings, notifications, payment methods, and admin preferences.</p></CardContent></Card></div>);
export default AdminSettings;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
const AdminAnalytics = () => (<div><h1 className="text-3xl font-heading font-bold mb-6">Analytics</h1><Card><CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" />Business Analytics</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Revenue trends, customer insights, product performance, and growth metrics.</p></CardContent></Card></div>);
export default AdminAnalytics;

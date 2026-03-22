import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useOrders, Order } from "@/contexts/OrderContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Package, Clock, CheckCircle2, ChefHat, Truck, ShoppingBag, XCircle, AlertTriangle } from "lucide-react";

type StatusKey = Order["status"];
const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
  confirmed: { label: "Order Confirmed", icon: CheckCircle2, color: "bg-blue-500/10 text-blue-600 border-blue-200" },
  preparing: { label: "Preparing", icon: ChefHat, color: "bg-amber-500/10 text-amber-600 border-amber-200" },
  out_for_delivery: { label: "Out for Delivery", icon: Truck, color: "bg-primary/10 text-primary border-primary/20" },
  delivered: { label: "Delivered", icon: Package, color: "bg-green-500/10 text-green-600 border-green-200" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "bg-destructive/10 text-destructive border-destructive/20" },
};
const statusSteps: StatusKey[] = ["confirmed", "preparing", "out_for_delivery", "delivered"];

function MinutesRemaining({ placedAt, estimatedMinutes, status }: { placedAt: number; estimatedMinutes: number; status: StatusKey }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (status === "delivered" || status === "cancelled") return;
    const interval = setInterval(() => setNow(Date.now()), 5000);
    return () => clearInterval(interval);
  }, [status]);
  if (status === "delivered") return <span className="text-sm text-green-600 font-medium">Delivered ✓</span>;
  if (status === "cancelled") return <span className="text-sm text-destructive font-medium">Cancelled</span>;
  const remainingMs = estimatedMinutes * 60 * 1000 - (now - placedAt);
  const remainingMins = Math.max(1, Math.ceil(remainingMs / 60000));
  return <span className="text-sm font-medium flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{remainingMins} min{remainingMins !== 1 ? "s" : ""} away</span>;
}

function CancelTimeRemaining({ order }: { order: Order }) {
  const { getCancelTimeRemaining } = useOrders();
  const [seconds, setSeconds] = useState(() => getCancelTimeRemaining(order));
  useEffect(() => {
    if (order.status === "delivered" || order.status === "cancelled") return;
    const interval = setInterval(() => setSeconds(getCancelTimeRemaining(order)), 1000);
    return () => clearInterval(interval);
  }, [order, getCancelTimeRemaining]);
  if (seconds <= 0) return null;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return <p className="text-xs text-muted-foreground"><AlertTriangle className="h-3 w-3 inline mr-1" />Cancel window: {mins}:{secs.toString().padStart(2, "0")}</p>;
}

const OrderCard = ({ order }: { order: Order }) => {
  const config = statusConfig[order.status];
  const StatusIcon = config.icon;
  const currentStep = order.status === "cancelled" ? -1 : statusSteps.indexOf(order.status);
  const { cancelOrder, canCancelOrder } = useOrders();
  const { toast } = useToast();
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [canCancel, setCanCancel] = useState(() => canCancelOrder(order));

  useEffect(() => {
    if (order.status === "delivered" || order.status === "cancelled") { setCanCancel(false); return; }
    const interval = setInterval(() => setCanCancel(canCancelOrder(order)), 1000);
    return () => clearInterval(interval);
  }, [order, canCancelOrder]);

  const handleCancel = () => {
    if (!cancelReason.trim()) { toast({ variant: "destructive", title: "Please provide a reason for cancellation" }); return; }
    const success = cancelOrder(order.id, cancelReason.trim());
    if (success) { toast({ title: "Order cancelled", description: "Your order has been cancelled." }); setShowCancelForm(false); setCancelReason(""); }
    else { toast({ variant: "destructive", title: "Cannot cancel", description: "The cancellation window has closed." }); }
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="font-mono text-sm font-bold">{order.id}</p>
            <p className="text-xs text-muted-foreground">{new Date(order.placedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p>
          </div>
          <div className="text-right">
            <Badge className={`${config.color} gap-1`}><StatusIcon className="h-3.5 w-3.5" />{config.label}</Badge>
            <div className="mt-1"><MinutesRemaining placedAt={order.placedAt} estimatedMinutes={order.estimatedMinutes} status={order.status} /></div>
          </div>
        </div>
        {order.status !== "cancelled" && (
          <div className="flex gap-1 mb-4">{statusSteps.map((_, i) => (<div key={i} className={`flex-1 h-1.5 rounded-full ${i <= currentStep ? "bg-primary" : "bg-muted"}`} />))}</div>
        )}
        {order.status === "cancelled" && order.cancelReason && (
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 mb-4">
            <p className="text-sm"><strong>Cancellation Reason:</strong> {order.cancelReason}</p>
          </div>
        )}
        <Separator className="my-3" />
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="h-8 w-8 rounded object-cover" />
              <span className="text-sm flex-1">{item.name}</span>
              <span className="text-xs text-muted-foreground">×{item.quantity}</span>
            </div>
          ))}
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{order.items.reduce((s, i) => s + i.quantity, 0)} items · {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod === "upi" ? "UPI" : "Card"}</span>
          <span className="font-bold">₹{order.grandTotal}</span>
        </div>
        {canCancel && order.status !== "cancelled" && (
          <>
            <Separator className="my-3" />
            <CancelTimeRemaining order={order} />
            {!showCancelForm && (
              <Button variant="outline" size="sm" onClick={() => setShowCancelForm(true)} className="mt-2 text-destructive border-destructive/30 hover:bg-destructive/10">Cancel Order</Button>
            )}
            {showCancelForm && (
              <div className="mt-3 space-y-2">
                <Textarea placeholder="Why are you cancelling?" value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} />
                <div className="flex gap-2">
                  <Button size="sm" variant="destructive" onClick={handleCancel}>Confirm Cancel</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowCancelForm(false)}>Keep Order</Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

const Orders = () => {
  const { orders } = useOrders();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="text-2xl font-heading font-bold mb-6">My Orders</h1>
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-heading font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Once you place an order, it will appear here.</p>
            <Link to="/products"><Button>Start Shopping</Button></Link>
          </div>
        ) : (
          <div className="space-y-4">{orders.map((order) => <OrderCard key={order.id} order={order} />)}</div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Orders;

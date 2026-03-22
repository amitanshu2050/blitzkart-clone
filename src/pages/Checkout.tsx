import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useOrders } from "@/contexts/OrderContext";
import { getDeliveryFee, getDeliveryMessage } from "@/lib/delivery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { MapPin, CreditCard, Banknote, Smartphone, ShieldCheck, ChevronLeft } from "lucide-react";

const Checkout = () => {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isPlacing, setIsPlacing] = useState(false);
  const [form, setForm] = useState({ fullName: "", phone: "", pincode: "", address: "", city: "", state: "", landmark: "" });

  const deliveryFee = getDeliveryFee(totalPrice);
  const grandTotal = totalPrice + deliveryFee;
  const deliveryMsg = getDeliveryMessage(totalPrice);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = () => {
    if (!form.fullName || !form.phone || !form.pincode || !form.address || !form.city || !form.state) {
      toast({ title: "Missing fields", description: "Please fill all required address fields.", variant: "destructive" }); return;
    }
    if (!/^\d{10}$/.test(form.phone)) { toast({ title: "Invalid phone", description: "Enter a valid 10-digit phone number.", variant: "destructive" }); return; }
    if (!/^\d{6}$/.test(form.pincode)) { toast({ title: "Invalid pincode", description: "Enter a valid 6-digit pincode.", variant: "destructive" }); return; }
    setIsPlacing(true);
    setTimeout(() => {
      placeOrder({ items: [...items], totalPrice, deliveryFee, grandTotal, address: form, paymentMethod });
      clearCart(); setIsPlacing(false); navigate("/orders");
      toast({ title: "Order placed! 🎉", description: "Track your order on the My Orders page." });
    }, 1500);
  };

  if (items.length === 0) {
    return (<div className="min-h-screen flex flex-col"><Navbar /><div className="flex-1 flex flex-col items-center justify-center p-8"><h1 className="text-2xl font-heading font-bold mb-4">No items to checkout</h1><Link to="/products"><Button>Browse Products</Button></Link></div><Footer /></div>);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"><ChevronLeft className="h-4 w-4" />Back to Cart</Link>
        <h1 className="text-2xl font-heading font-bold mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" />Delivery Address</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div><Label>Full Name *</Label><Input name="fullName" value={form.fullName} onChange={handleChange} /></div>
                <div><Label>Phone Number *</Label><Input name="phone" value={form.phone} onChange={handleChange} /></div>
                <div className="sm:col-span-2"><Label>Address *</Label><Textarea name="address" value={form.address} onChange={handleChange} /></div>
                <div><Label>City *</Label><Input name="city" value={form.city} onChange={handleChange} /></div>
                <div><Label>State *</Label><Input name="state" value={form.state} onChange={handleChange} /></div>
                <div><Label>Pincode *</Label><Input name="pincode" value={form.pincode} onChange={handleChange} /></div>
                <div><Label>Landmark</Label><Input name="landmark" value={form.landmark} onChange={handleChange} /></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" />Payment Method</CardTitle></CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="cod" id="cod" /><Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer"><Banknote className="h-4 w-4" />Cash on Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="upi" id="upi" /><Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer"><Smartphone className="h-4 w-4" />UPI</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="card" id="card" /><Label htmlFor="card" className="flex items-center gap-2 cursor-pointer"><CreditCard className="h-4 w-4" />Credit/Debit Card</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
          <div className="bg-card border rounded-xl p-6 h-fit">
            <h2 className="text-lg font-heading font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm mb-4">
              {items.map(i => (<div key={i.name} className="flex justify-between"><span className="text-muted-foreground">{i.name} ×{i.quantity}</span><span>₹{i.price * i.quantity}</span></div>))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{totalPrice}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span className={deliveryFee === 0 ? "text-primary" : ""}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span></div>
              {deliveryMsg && <p className="text-xs text-primary">{deliveryMsg}</p>}
              <Separator />
              <div className="flex justify-between font-bold text-base"><span>Total</span><span>₹{grandTotal}</span></div>
            </div>
            <Button className="w-full mt-6 gap-2" size="lg" onClick={handlePlaceOrder} disabled={isPlacing}>
              <ShieldCheck className="h-4 w-4" />{isPlacing ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;

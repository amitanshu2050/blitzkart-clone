import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDeliveryFee, getDeliveryMessage } from "@/lib/delivery";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-heading font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
          <Link to="/products"><Button>Start Shopping</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const deliveryFee = getDeliveryFee(totalPrice);
  const deliveryMsg = getDeliveryMessage(totalPrice);
  const grandTotal = totalPrice + deliveryFee;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-heading font-bold">Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})</h1>
          <Button variant="ghost" size="sm" className="text-destructive" onClick={clearCart}><Trash2 className="h-4 w-4 mr-1" />Clear Cart</Button>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.name} className="flex gap-4 p-4 bg-card border rounded-xl">
                <img src={item.image} alt={item.name} className="h-20 w-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-heading font-semibold">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">{item.unit}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-primary">₹{item.price}</span>
                    {item.originalPrice && <span className="text-xs text-muted-foreground line-through">₹{item.originalPrice}</span>}
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => updateQuantity(item.name, item.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <Button size="sm" className="h-7 w-7 p-0" onClick={() => updateQuantity(item.name, item.quantity + 1)}><Plus className="h-3 w-3" /></Button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{item.price * item.quantity}</p>
                    <button onClick={() => removeItem(item.name)} className="text-xs text-destructive hover:underline mt-1">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-card border rounded-xl p-6 h-fit">
            <h2 className="text-lg font-heading font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Subtotal ({totalItems} items)</span><span>₹{totalPrice}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span className={deliveryFee === 0 ? "text-primary font-semibold" : ""}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span></div>
              {deliveryMsg && <p className="text-xs text-primary">{deliveryMsg}</p>}
              <div className="border-t pt-3 flex justify-between font-bold text-base"><span>Total</span><span>₹{grandTotal}</span></div>
            </div>
            <Link to="/checkout"><Button className="w-full mt-6">Proceed to Checkout</Button></Link>
            <Link to="/products" className="block text-center text-sm text-primary hover:underline mt-3">Continue Shopping</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;

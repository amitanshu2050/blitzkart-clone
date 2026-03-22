import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  discount?: number;
}

const ProductCard = ({ name, price, originalPrice, unit, image, discount }: ProductCardProps) => {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find((i) => i.name === name);
  const quantity = cartItem?.quantity ?? 0;

  return (
    <div className="group relative bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      {discount && (
        <div className="absolute top-2 left-2 z-10">
          <span className="px-2 py-0.5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full">
            {discount}% OFF
          </span>
        </div>
      )}
      <div className="aspect-square p-4 flex items-center justify-center bg-muted/30">
        <img src={image} alt={name} className="h-full w-full object-cover rounded-lg" />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold font-heading line-clamp-1">{name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{unit}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-bold text-primary">₹{price}</span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through">₹{originalPrice}</span>
          )}
        </div>
        <div className="mt-2">
          {quantity === 0 ? (
            <Button
              size="sm"
              className="w-full gap-1 h-8 text-xs"
              onClick={() => addItem({ name, price, originalPrice, unit, image })}
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </Button>
          ) : (
            <div className="flex items-center justify-between">
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => updateQuantity(name, quantity - 1)}
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
              <span className="text-sm font-bold">{quantity}</span>
              <Button
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => updateQuantity(name, quantity + 1)}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

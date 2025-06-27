import React, { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

// Define the shape of a single cart item
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

// --- Mock Data for Demonstration ---
// In a real application, this data would be passed in as props from a global state manager (e.g., Context, Zustand, Redux).
const mockCartItems: CartItem[] = [
  { id: "sushi-1", name: "Spicy Tuna Roll", price: 12.99, quantity: 1, image: "https://via.placeholder.com/150" },
  { id: "drink-2", name: "Green Tea", price: 2.50, quantity: 2, image: "https://via.placeholder.com/150" },
  { id: "side-3", name: "Edamame", price: 5.00, quantity: 1, image: "https://via.placeholder.com/150" },
];
// --- End Mock Data ---


interface CartSummaryProps {
  // In a real app, you would pass these props
  // items?: CartItem[];
  // onUpdateQuantity?: (id: string, newQuantity: number) => void;
  // onRemoveItem?: (id: string) => void;
  // onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = (props) => {
  // For demonstration, we use mock data. In a real app, use props.items || [].
  const items = mockCartItems; 
  console.log('CartSummary loaded');

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    // In a real app, this would call props.onUpdateQuantity(id, newQuantity);
    console.log(`Updating item ${id} to quantity ${newQuantity}`);
  };

  const handleRemoveItem = (id: string) => {
    // In a real app, this would call props.onRemoveItem(id);
    console.log(`Removing item ${id}`);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
      </div>

      {items.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
          <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold">Your cart is empty</h3>
          <p className="text-sm text-gray-500">Add items from a restaurant to get started.</p>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-grow">
            <div className="p-4 space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                    <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-500" onClick={() => handleRemoveItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t mt-auto">
            <div className="flex justify-between items-center text-lg font-semibold mb-4">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Separator className="mb-4" />
            <Button size="lg" className="w-full" asChild>
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createOrderAction } from "@/actions/orderAction";
import { toast } from "sonner";

interface CartItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
}

export function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [address, setAddress] = useState("");

  /* ============================
     Load cart from localStorage
  ============================ */
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  /* ============================
     Sync cart to localStorage
  ============================ */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ============================
     Remove item
  ============================ */
  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  /* ============================
     Calculations
  ============================ */
  const itemTotal = (item: CartItem) => Number(item.price) * item.quantity;

  const grandTotal = cart.reduce((sum, item) => sum + itemTotal(item), 0);

  /* ============================
     Checkout
  ============================ */
  const handleCheckout = async () => {
    if (!address) {
      alert("Please enter delivery address");
      return;
    }

    const payload = {
      address,
      items: cart.map((item) => ({
        medicineId: item.id,
        quantity: item.quantity,
      })),
    };

    const data = await createOrderAction(payload);

    if (!data) {
      toast.success("order create successfully");
    }
    
    if (data) {
      toast.success("order create successfully");
    }
  };

  if (cart.length === 0) {
    return <p className="text-center">Your cart is empty</p>;
  }

  return (
    <section className="container mx-auto max-w-3xl px-6 py-12 space-y-6">
      <h1 className="text-2xl font-semibold">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded p-4"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">
                ৳ {item.price} × {item.quantity}
              </p>
              <p className="font-semibold">Item total: ৳ {itemTotal(item)}</p>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Delivery Address</label>
        <Input
          placeholder="Add your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Grand total */}
      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>৳ {grandTotal}</span>
      </div>

      {/* Checkout */}
      <Button className="w-full" onClick={handleCheckout}>
        Checkout
      </Button>
    </section>
  );
}

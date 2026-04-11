"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";

interface AddToCartProps {
  id: string;
  title: string;
  price: number;
  stock: number;
  disabled: boolean;
  user?: { role: string };
}

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export function AddToCart({ id, title, price, stock, user }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    if (quantity < stock) {
      setQuantity((q) => q + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const convertedPrice = Number(price);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("login  first");
      return redirect("/login");
    }

    if (user.role !== "USER") {
      toast.error("login as customer first!");
      return redirect("/login");
    }

    const stored = localStorage.getItem("cart");
    const cart: CartItem[] = stored ? JSON.parse(stored) : [];

    const existingIndex = cart.findIndex((item) => item.id === id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id,
        title,
        price: convertedPrice,
        quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("successfully added data to the cart");
  };

  return (
    <div className="space-y-4">
      {/* Quantity selector */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={decrease}
          disabled={quantity === 1}
        >
          −
        </Button>

        <span className="w-8 text-center">{quantity}</span>

        <Button
          variant="outline"
          size="sm"
          onClick={increase}
          disabled={quantity === stock}
        >
          +
        </Button>
      </div>

      {/* Add to cart */}
      <Button
        onClick={handleAddToCart}
        disabled={stock === 0}
        className="w-full hover:bg-[rgb(90,191,36)]  bg-[rgb(90,191,36)]"
      >
        Add to cart
      </Button>
    </div>
  );
}

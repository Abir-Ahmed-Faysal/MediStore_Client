'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface WishlistItem {
  id: string;
  title: string;
  price: number;
  image: string;
  manufacturer: string;
  rating: number;
  inStock: boolean;
}

const SAMPLE_WISHLIST: WishlistItem[] = [
  {
    id: '1',
    title: 'Aspirin 500mg',
    price: 150,
    image: '/images/aspirin.jpg',
    manufacturer: 'Bayer',
    rating: 4.5,
    inStock: true,
  },
  {
    id: '2',
    title: 'Ibuprofen 400mg',
    price: 200,
    image: '/images/ibuprofen.jpg',
    manufacturer: 'Advil',
    rating: 4.7,
    inStock: true,
  },
  {
    id: '3',
    title: 'Vitamin C Complex',
    price: 350,
    image: '/images/vitamin-c.jpg',
    manufacturer: 'Nature Made',
    rating: 4.3,
    inStock: false,
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(SAMPLE_WISHLIST);

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (item: WishlistItem) => {
    if (!item.inStock) {
      toast.error('This item is currently out of stock');
      return;
    }
    toast.success(`Added ${item.title} to cart`);
  };

  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0);

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <Heart className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Your Wishlist is Empty
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Start adding medicines to your wishlist by clicking the heart icon on product cards
          </p>
          <Link href="/explore">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Browse Medicines
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 dark:from-red-800 dark:to-red-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 fill-current" />
            <h1 className="text-4xl font-bold">My Wishlist</h1>
          </div>
          <p className="text-red-100">{wishlist.length} items in your wishlist</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wishlist Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-full md:w-32 h-32 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <ShoppingCart className="w-12 h-12 text-blue-800 opacity-50" />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            by {item.manufacturer}
                          </p>
                        </div>
                        {!item.inStock && (
                          <span className="px-3 py-1 text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < Math.floor(item.rating)
                                  ? 'text-yellow-400'
                                  : 'text-slate-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {item.rating}/5
                        </span>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          Rs. {item.price.toFixed(2)}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAddToCart(item)}
                            disabled={!item.inStock}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </Button>
                          <button
                            onClick={() => handleRemoveFromWishlist(item.id)}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-600 dark:text-red-400"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wishlist Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 h-fit sticky top-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">
                Wishlist Summary
              </h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Total Items:</span>
                  <span className="font-semibold">{wishlist.length}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>In Stock:</span>
                  <span className="font-semibold text-green-600">
                    {wishlist.filter((item) => item.inStock).length}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Out of Stock:</span>
                  <span className="font-semibold text-red-600">
                    {wishlist.filter((item) => !item.inStock).length}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Total Value:</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    Rs. {totalValue.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3 flex items-center justify-between">
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Link href="/checkout">
                <Button
                  variant="outline"
                  className="w-full"
                >
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            You Might Also Like
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800 p-8 text-center">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Personalized recommendations coming soon based on your wishlist
            </p>
            <Link href="/explore">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Browse All Medicines
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

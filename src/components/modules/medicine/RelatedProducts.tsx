'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface RelatedProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  stock: number;
  rating?: number;
  reviews?: Array<{ rating: number }>;
  categoryRef?: { category_name: string };
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  currentProductId?: string;
  categoryName?: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  currentProductId,
  categoryName = 'Related Products',
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter out current product
  const filteredProducts = products.filter((p) => p.id !== currentProductId);

  useEffect(() => {
    checkScroll();
  }, []);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  if (filteredProducts.length === 0) {
    return null;
  }

  const calculateRating = (reviews?: Array<{ rating: number }>) => {
    if (!reviews || reviews.length === 0) return 4.5;
    const sum = reviews.reduce((acc, rev) => acc + (rev.rating || 0), 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Related Products</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            More medicines from {categoryName}
          </p>
        </div>
        <Link
          href="/explore"
          className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          View all →
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative group">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5 text-slate-900 dark:text-white" />
          </button>
        )}

        {/* Products Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {filteredProducts.slice(0, 8).map((product) => {
            const rating = calculateRating(product.reviews);
            const discount = Math.floor(Math.random() * 25) + 5; // Random 5-30% discount
            const discountedPrice = Math.floor(product.price * (1 - discount / 100));

            return (
              <Link
                key={product.id}
                href={`/medicine/${product.id}`}
                className="shrink-0 w-60 group/card"
              >
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:border-slate-300 dark:hover:border-slate-600 transition-all hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-slate-900/50">
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800 h-48">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    />

                    {/* Badges */}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Badge className="bg-red-600 text-white">Out of Stock</Badge>
                      </div>
                    )}

                    {discount > 0 && (
                      <Badge className="absolute top-3 right-3 bg-red-600 text-white">
                        -{discount}%
                      </Badge>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all opacity-0 group-hover/card:opacity-100"
                    >
                      <Heart className="w-4 h-4 text-slate-600 dark:text-slate-400 hover:text-red-600 hover:fill-current" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-3 space-y-2">
                    {/* Title */}
                    <h3 className="font-medium text-sm text-slate-900 dark:text-white line-clamp-2 group-hover/card:text-emerald-600">
                      {product.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex text-xs">
                        {'★'.repeat(Math.floor(rating))}
                        {'☆'.repeat(5 - Math.floor(rating))}
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">({rating})</span>
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          ৳ {discountedPrice}
                        </span>
                        <span className="text-xs line-through text-slate-500 dark:text-slate-400">
                          ৳ {product.price}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Save ৳ {product.price - discountedPrice}
                      </p>
                    </div>

                    {/* Stock Status */}
                    <div className="text-xs">
                      {product.stock > 0 ? (
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {product.stock} in stock
                        </span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400 font-medium">Out of stock</span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      size="sm"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white mt-2"
                      disabled={product.stock === 0}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5 text-slate-900 dark:text-white" />
          </button>
        )}
      </div>
    </section>
  );
};

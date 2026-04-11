'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Plus, Minus, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  title: string;
  image: string;
  images?: string[];
  price: number;
  stock: number;
  rating: number;
  reviews: Array<{ rating: number }>;
  isFeatured: boolean;
  manufacturer: string;
  description: string;
}

interface ImageGalleryProps {
  product: Product;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ product }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Use provided images array or create array with main image
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 group">
        <img
          src={images[selectedIndex]}
          alt={`${product.title} - View ${selectedIndex + 1}`}
          className="w-full h-full object-contain p-4"
        />

        {/* Zoom Indicator */}
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
          🔍 Hover to zoom
        </div>

        {/* Featured Badge */}
        {product.isFeatured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            ⭐ Featured
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 rounded-full p-2 shadow-lg transition-all hover:shadow-xl opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-slate-900 dark:text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 rounded-full p-2 shadow-lg transition-all hover:shadow-xl opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-slate-900 dark:text-white" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                index === selectedIndex
                  ? 'border-emerald-500 ring-2 ring-emerald-500/50'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain p-1" />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          {selectedIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

interface ProductInfoProps {
  product: Product;
  onAddToCart: (quantity: number) => void;
  isLoading?: boolean;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, onAddToCart, isLoading = false }) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = Math.floor(Math.random() * 30) + 5;
  const discountedPrice = Math.floor(product.price * (1 - discount / 100));
  const averageRating = product.reviews?.length > 0
    ? (product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length).toFixed(1)
    : 0;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Category & Rating */}
      <div className="flex items-center justify-between">
        <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium">
          Medicine
        </span>
        {product.reviews?.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(Number(averageRating)) ? '⭐' : '☆'} />
              ))}
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {averageRating} ({product.reviews.length} reviews)
            </span>
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">{product.title}</h1>
        <p className="text-slate-600 dark:text-slate-400">
          By <span className="font-semibold text-slate-900 dark:text-white">{product.manufacturer}</span>
        </p>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">৳ {discountedPrice}</span>
          <span className="text-xl text-slate-400 dark:text-slate-500 line-through">৳ {product.price}</span>
          <span className="text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-2 py-1 rounded">
            -{discount}%
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">You save ৳ {product.price - discountedPrice}</p>
      </div>

      {/* Stock Status */}
      <div className={`p-3 rounded-lg border-2 ${
        product.stock > 0
          ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20'
          : 'border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20'
      }`}>
        <p className={`text-sm font-semibold ${
          product.stock > 0
            ? 'text-emerald-700 dark:text-emerald-400'
            : 'text-red-700 dark:text-red-400'
        }`}>
          {product.stock > 0 ? `✓ In Stock - ${product.stock} units available` : 'Out of Stock'}
        </p>
      </div>

      {/* Description */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{product.description}</p>
      </div>

      {/* Quantity Selector */}
      {product.stock > 0 && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Quantity:</span>
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity === 1}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 min-w-[50px] text-center font-semibold">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={() => onAddToCart(quantity)}
          disabled={product.stock === 0 || isLoading}
          size="lg"
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
        >
          🛒 Add to Cart
        </Button>
        <Button
          onClick={() => setIsWishlisted(!isWishlisted)}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          {isWishlisted ? 'Saved' : 'Save'}
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          <Share2 className="w-5 h-5" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </div>

      {/* Trust Section */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-slate-900 dark:text-white">Free Delivery</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">On orders above ৳500</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-slate-900 dark:text-white">100% Authentic</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Verified medicines</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-slate-900 dark:text-white">Easy Returns</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">7 days return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

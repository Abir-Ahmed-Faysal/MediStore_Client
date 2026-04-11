'use client';

import React from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { MedicineResponse } from '@/services/medicine.service';

interface ProductCardProps {
  medicine: MedicineResponse;
  onAddToCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  medicine,
  onAddToCart,
  onAddToWishlist,
}) => {
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const rating = medicine.reviews?.length > 0
    ? (
        medicine.reviews.reduce((sum, r) => sum + Number(r.rating), 0) /
        medicine.reviews.length
      ).toFixed(1)
    : '0';

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      toast.success('Added to wishlist!', {
        description: 'This item has been saved to your favorites.',
      });
    } else {
      toast.info('Removed from wishlist', {
        description: 'Item has been removed from your favorites.',
      });
    }
    onAddToWishlist?.(medicine.id);
  };

  const handleAddToCart = () => {
    toast.success('Added to cart!', {
      description: 'Your item has been added to the shopping cart.',
      action: {
        label: 'View Cart',
        onClick: () => window.location.href = '/dashboard/cart',
      },
    });
    onAddToCart?.(medicine.id);
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
      {/* Product Image */}
      <Link href={`/medicine/${medicine.id}`}>
        <div className="relative h-48 bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
          <Image
            src={medicine.image || '/placeholder-medicine.jpg'}
            alt={medicine.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Featured Badge */}
          {medicine.isFeatured && (
            <div className="absolute top-3 left-3 bg-linear-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              ⭐ Featured
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleWishlist();
            }}
            className="absolute top-3 right-3 p-2.5 bg-white rounded-full shadow-md hover:bg-red-50 hover:shadow-lg transition-all duration-200 group/heart"
          >
            <Heart
              size={20}
              className={`transition-all duration-300 ${
                isWishlisted
                  ? 'fill-red-500 text-red-500 scale-110'
                  : 'text-gray-400 group-hover/heart:text-red-400'
              }`}
            />
          </button>

          {/* Stock Status */}
          <div className="absolute bottom-3 left-3">
            <span
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-md inline-block ${
                medicine.stock > 0
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {medicine.stock > 0 ? `In Stock (${medicine.stock})` : 'Out of Stock'}
            </span>
          </div>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col h-full">
        {/* Title */}
        <Link href={`/medicine/${medicine.id}`} className="group/title">
          <h3 className="font-bold text-gray-900 line-clamp-2 group-hover/title:text-blue-600 transition text-sm">
            {medicine.title}
          </h3>
        </Link>

        {/* Manufacturer */}
        <p className="text-xs text-gray-500 mt-1 font-medium">{medicine.manufacturer}</p>

        {/* Category Badge */}
        <div className="mt-2">
          <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
            {medicine.categoryRef?.category_name}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(Number(rating))
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 font-semibold">
            {rating} ({medicine.reviews?.length || 0})
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 mt-2 line-clamp-2 grow">
          {medicine.description}
        </p>

        {/* Price Section */}
        <div className="mt-3 mb-3 pb-3 border-b border-gray-100">
          <span className="text-2xl font-bold text-blue-600">
            ${Number(medicine.price).toFixed(2)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/medicine/${medicine.id}`}
            className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-center text-xs font-bold hover:shadow-md"
          >
            Details
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={medicine.stock <= 0}
            className="flex-1 px-3 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition text-xs font-bold disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProductGridProps {
  medicines: MedicineResponse[];
  isLoading?: boolean;
  onAddToCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  medicines,
  isLoading = false,
  onAddToCart,
  onAddToWishlist,
  emptyMessage = 'No medicines found',
}) => {
  if (medicines.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-4xl mb-4">📦</div>
        <p className="text-gray-600 text-lg">{emptyMessage}</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {medicines.map((medicine) => (
        <ProductCard
          key={medicine.id}
          medicine={medicine}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      ))}
    </div>
  );
};

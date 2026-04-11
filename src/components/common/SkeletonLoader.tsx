'use client';

import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
  variant?: 'card' | 'text' | 'line' | 'circle';
  width?: string;
  height?: string;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 1,
  variant = 'card',
  width = '100%',
  height = '200px',
  className = '',
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded-lg';

  const getVariantClasses = () => {
    switch (variant) {
      case 'circle':
        return 'rounded-full';
      case 'text':
        return 'h-4 w-3/4 rounded';
      case 'line':
        return 'h-2 w-1/2 rounded';
      case 'card':
      default:
        return 'rounded-lg';
    }
  };

  const variantClasses = getVariantClasses();

  if (variant === 'card') {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg shadow">
            {/* Image skeleton */}
            <div className={`${baseClasses} h-48 w-full`} />
            
            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              {/* Title */}
              <div className={`${baseClasses} h-4 w-3/4`} />
              
              {/* Price */}
              <div className={`${baseClasses} h-4 w-1/2`} />
              
              {/* Button */}
              <div className={`${baseClasses} h-10 w-full`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`} style={{ width, height }} />
  );
};

export const ProductCardSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="overflow-hidden rounded-lg shadow-md bg-white">
          {/* Image skeleton */}
          <div className="animate-pulse bg-gray-200 h-48 w-full" />
          
          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <div className="animate-pulse bg-gray-200 h-4 w-3/4 rounded" />
            
            {/* Manufacturer */}
            <div className="animate-pulse bg-gray-200 h-3 w-1/2 rounded" />
            
            {/* Price */}
            <div className="animate-pulse bg-gray-200 h-4 w-2/3 rounded" />
            
            {/* Rating */}
            <div className="animate-pulse bg-gray-200 h-3 w-1/3 rounded mt-2" />
            
            {/* Button */}
            <div className="animate-pulse bg-gray-200 h-10 w-full rounded mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

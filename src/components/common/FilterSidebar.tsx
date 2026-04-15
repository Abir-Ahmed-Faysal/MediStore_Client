'use client';

import React from 'react';
import { ChevronDown, X } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface PriceRange {
  min: number;
  max: number;
}

interface FilterSidebarProps {
  categories?: FilterOption[];
  manufacturers?: FilterOption[];
  priceRange?: PriceRange;
  selectedCategory?: string;
  selectedManufacturer?: string;
  selectedPrice?: PriceRange;
  onCategoryChange?: (value: string) => void;
  onManufacturerChange?: (value: string) => void;
  onPriceChange?: (range: PriceRange) => void;
  onClearFilters?: () => void;
  isLoading?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories = [],
  manufacturers = [],
  priceRange = { min: 0, max: 1000 },
  selectedCategory = '',
  selectedManufacturer = '',
  selectedPrice = { min: 0, max: 1000 },
  onCategoryChange,
  onManufacturerChange,
  onPriceChange,
  onClearFilters,
  isLoading = false,
  isMobile = false,
  onClose,
}) => {
  const [expandedSections, setExpandedSections] = React.useState({
    category: true,
    manufacturer: true,
    price: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const hasActiveFilters = selectedCategory || selectedManufacturer || 
    (selectedPrice.min !== 0 || selectedPrice.max !== priceRange.max);

  return (
    <div className={`${isMobile ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : ''}`}>
      <div
        className={`${
          isMobile
            ? 'fixed left-0 top-0 h-full w-64 bg-white shadow-xl overflow-y-auto z-50'
            : 'bg-white rounded-lg shadow-md p-6'
        } space-y-6`}
      >
        {/* Header with close button (mobile) */}
        {isMobile && (
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X size={24} />
            </button>
          </div>
        )}

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            aria-label="Clear all selected filters and reset to show all products"
            className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Clear All Filters
          </button>
        )}

        {/* Category Filter */}
        <div className={isMobile ? 'px-4' : ''}>
          <button
            onClick={() => toggleSection('category')}
            aria-expanded={expandedSections.category}
            aria-controls="category-filter"
            className="w-full flex items-center justify-between font-semibold text-gray-900 hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
          >
            <span>Category</span>
            <ChevronDown
              size={20}
              className={`transition-transform ${
                expandedSections.category ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {expandedSections.category && (
            <div id="category-filter" className="mt-3 space-y-2" role="group" aria-label="Category options">
              <label className="flex items-center gap-3 cursor-pointer group focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 rounded px-1">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={selectedCategory === ''}
                  onChange={() => onCategoryChange?.('')}
                  disabled={isLoading}
                  aria-label="Show all categories"
                  className="w-4 h-4 text-blue-600 cursor-pointer disabled:opacity-50 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  All Categories
                </span>
              </label>

              {categories.map(category => (
                <label key={category.value} className="flex items-center gap-3 cursor-pointer group focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 rounded px-1">
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={selectedCategory === category.value}
                    onChange={() => onCategoryChange?.(category.value)}
                    disabled={isLoading}
                    aria-label={`Filter by ${category.label}`}
                    className="w-4 h-4 text-blue-600 cursor-pointer disabled:opacity-50 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {category.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Manufacturer Filter */}
        <div className={isMobile ? 'px-4' : ''}>
          <button
            onClick={() => toggleSection('manufacturer')}
            className="w-full flex items-center justify-between font-semibold text-gray-900 hover:text-blue-600 transition"
          >
            <span>Manufacturer</span>
            <ChevronDown
              size={20}
              className={`transition-transform ${
                expandedSections.manufacturer ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections.manufacturer && (
            <div className="mt-3 space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="manufacturer"
                  value=""
                  checked={selectedManufacturer === ''}
                  onChange={() => onManufacturerChange?.('')}
                  disabled={isLoading}
                  className="w-4 h-4 text-blue-600 cursor-pointer disabled:opacity-50"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  All Manufacturers
                </span>
              </label>

              {manufacturers.map(manufacturer => (
                <label
                  key={manufacturer.value}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="manufacturer"
                    value={manufacturer.value}
                    checked={selectedManufacturer === manufacturer.value}
                    onChange={() => onManufacturerChange?.(manufacturer.value)}
                    disabled={isLoading}
                    className="w-4 h-4 text-blue-600 cursor-pointer disabled:opacity-50"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {manufacturer.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className={isMobile ? 'px-4' : ''}>
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between font-semibold text-gray-900 hover:text-blue-600 transition"
          >
            <span>Price Range</span>
            <ChevronDown
              size={20}
              className={`transition-transform ${
                expandedSections.price ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections.price && (
            <div className="mt-4 space-y-4">
              {/* Price Range Display */}
              <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-3 mb-4 border border-blue-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-600">Selected Range</span>
                  <span className="text-lg font-bold text-blue-600">
                    ${selectedPrice.min} - ${selectedPrice.max}
                  </span>
                </div>
              </div>

              {/* Min Price Slider */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  Minimum: ${selectedPrice.min}
                </label>
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={selectedPrice.min}
                  onChange={(e) =>
                    onPriceChange?.({
                      ...selectedPrice,
                      min: Math.min(Number(e.target.value), selectedPrice.max),
                    })
                  }
                  disabled={isLoading}
                  className="w-full h-2.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                />
              </div>

              {/* Max Price Slider */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  Maximum: ${selectedPrice.max}
                </label>
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={selectedPrice.max}
                  onChange={(e) =>
                    onPriceChange?.({
                      ...selectedPrice,
                      max: Math.max(Number(e.target.value), selectedPrice.min),
                    })
                  }
                  disabled={isLoading}
                  className="w-full h-2.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

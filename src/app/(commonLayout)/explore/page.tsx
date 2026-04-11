'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';
import { toast } from 'sonner';
import { SearchBar } from '@/components/common/SearchBar';
import { FilterSidebar } from '@/components/common/FilterSidebar';
import { ProductCard, ProductGrid } from '@/components/common/ProductCard';
import { ProductCardSkeleton } from '@/components/common/SkeletonLoader';
import { useFilters } from '@/hooks/useFilters';
import { medicineService, MedicineResponse } from '@/services/medicine.service';

interface Category {
  id: string;
  name: string;
}

export default function ExplorePage() {
  const filters = useFilters(12);
  
  const [medicines, setMedicines] = useState<MedicineResponse[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPage: 0,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch medicines
  useEffect(() => {
    const fetchMedicines = async () => {
      setIsLoading(true);
      try {
        const params = filters.getApiParams();
        const result = await medicineService.getAllMedicines(params);

        if (result.data) {
          setMedicines(result.data.data);
          setPagination(result.data.pagination);
        } else {
          console.error('Failed to fetch medicines:', result.error);
        }
      } catch (error) {
        console.error('Error fetching medicines:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicines();
  }, [filters.searchQuery, filters.category, filters.manufacturer, filters.priceRange, filters.page]);

  // Fetch categories (one time)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await medicineService.getAllMedicines({ limit: 1000 });
        if (result.data) {
          // Extract unique categories
          const uniqueCategories = Array.from(
            new Map(
              result.data.data
                .filter(m => m.categoryRef)
                .map(m => [m.categoryRef.category_name, m.categoryRef.category_name])
            ).entries()
          ).map(([name]) => ({
            id: name.toLowerCase(),
            name,
          }));
          setCategories(uniqueCategories);

          // Extract unique manufacturers
          const uniqueManufacturers = Array.from(
            new Set(result.data.data.map(m => m.manufacturer).filter(Boolean))
          );
          setManufacturers(uniqueManufacturers as string[]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddToCart = (id: string) => {
    toast.success('Added to cart successfully!', {
      description: 'Your item has been added to the shopping cart.',
    });
  };

  const handleAddToWishlist = (id: string) => {
    toast.success('Added to wishlist!', {
      description: 'You can view your saved items in your profile.',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Explore Medicines
            </h1>
            <p className="text-gray-600 text-lg">
              {pagination.total} medicines available
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar
            value={filters.searchQuery}
            onChange={filters.setSearchQuery}
            onSearch={() => filters.setPage(1)}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterSidebar
              categories={categories.map(c => ({
                label: c.name,
                value: c.id,
              }))}
              manufacturers={manufacturers.map(m => ({
                label: m,
                value: m,
              }))}
              selectedCategory={filters.category}
              selectedManufacturer={filters.manufacturer}
              selectedPrice={filters.priceRange}
              onCategoryChange={filters.setCategory}
              onManufacturerChange={filters.setManufacturer}
              onPriceChange={filters.setPriceRange}
              onClearFilters={filters.clearFilters}
              isLoading={isLoading}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6 flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <Filter size={20} />
                Filters
              </button>
            </div>

            {/* Mobile Filter Overlay */}
            {showFilters && (
              <div className="lg:hidden mb-6">
                <FilterSidebar
                  categories={categories.map(c => ({
                    label: c.name,
                    value: c.id,
                  }))}
                  manufacturers={manufacturers.map(m => ({
                    label: m,
                    value: m,
                  }))}
                  selectedCategory={filters.category}
                  selectedManufacturer={filters.manufacturer}
                  selectedPrice={filters.priceRange}
                  onCategoryChange={filters.setCategory}
                  onManufacturerChange={filters.setManufacturer}
                  onPriceChange={filters.setPriceRange}
                  onClearFilters={filters.clearFilters}
                  isLoading={isLoading}
                  isMobile
                  onClose={() => setShowFilters(false)}
                />
              </div>
            )}

            {/* Sort and Results Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                {isLoading ? (
                  'Loading...'
                ) : (
                  <>
                    Showing <span className="font-semibold">{medicines.length}</span> of{' '}
                    <span className="font-semibold">{pagination.total}</span> results
                  </>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) => filters.setSortBy(e.target.value as any)}
                  className="appearance-none px-4 py-2 pr-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popular">Most Popular</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={20} />
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <ProductCardSkeleton count={filters.limit} />
            ) : (
              <ProductGrid
                medicines={medicines}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                emptyMessage="No medicines found matching your criteria"
              />
            )}

            {/* Pagination */}
            {pagination.totalPage > 1 && !isLoading && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => filters.setPage(Math.max(1, filters.page - 1))}
                  disabled={filters.page <= 1}
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, pagination.totalPage) }).map((_, idx) => {
                  const pageNum = Math.max(1, filters.page - 2) + idx;
                  if (pageNum > pagination.totalPage) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => filters.setPage(pageNum)}
                      className={`px-3 py-2 rounded-lg transition ${
                        filters.page === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => filters.setPage(Math.min(pagination.totalPage, filters.page + 1))}
                  disabled={filters.page >= pagination.totalPage}
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}

            {/* Active Filters Display */}
            {filters.hasActiveFilters && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Active Filters:</p>
                  <button
                    onClick={filters.clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {filters.searchQuery && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      Search: {filters.searchQuery}
                      <button onClick={() => filters.setSearchQuery('')}>
                        <X size={16} />
                      </button>
                    </span>
                  )}
                  {filters.category && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      Category: {filters.category}
                      <button onClick={() => filters.setCategory('')}>
                        <X size={16} />
                      </button>
                    </span>
                  )}
                  {filters.manufacturer && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      Manufacturer: {filters.manufacturer}
                      <button onClick={() => filters.setManufacturer('')}>
                        <X size={16} />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

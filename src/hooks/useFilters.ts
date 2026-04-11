'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export interface PriceRange {
  min: number;
  max: number;
}

export interface UseFiltersReturn {
  searchQuery: string;
  category: string;
  manufacturer: string;
  priceRange: PriceRange;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';
  page: number;
  limit: number;

  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setManufacturer: (manufacturer: string) => void;
  setPriceRange: (range: PriceRange) => void;
  setSortBy: (sort: 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular') => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;

  clearFilters: () => void;
  hasActiveFilters: boolean;
  getApiParams: () => Record<string, any>;
}

const DEFAULT_PRICE_RANGE = { min: 0, max: 1000 };

export const useFilters = (defaultLimit: number = 12): UseFiltersReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL params
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );
  const [category, setCategory] = useState(
    searchParams.get('category') || ''
  );
  const [manufacturer, setManufacturer] = useState(
    searchParams.get('manufacturer') || ''
  );
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: parseInt(searchParams.get('minPrice') || '0'),
    max: parseInt(searchParams.get('maxPrice') || '1000'),
  });
  const [sortBy, setSortBy] = useState<UseFiltersReturn['sortBy']>(
    (searchParams.get('sort') as any) || 'newest'
  );
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [limit] = useState(defaultLimit);

  // URL update ref to prevent unnecessary updates
  const updateTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Update URL when filters change
  const updateUrl = useCallback(() => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams();

      if (searchQuery) params.set('search', searchQuery);
      if (category) params.set('category', category);
      if (manufacturer) params.set('manufacturer', manufacturer);
      if (priceRange.min > 0) params.set('minPrice', String(priceRange.min));
      if (priceRange.max < 1000) params.set('maxPrice', String(priceRange.max));
      if (sortBy !== 'newest') params.set('sort', sortBy);
      if (page > 1) params.set('page', String(page));

      const queryString = params.toString();
      const newUrl = queryString ? `/explore?${queryString}` : '/explore';
      router.push(newUrl);
    }, 500);
  }, [searchQuery, category, manufacturer, priceRange, sortBy, page, router]);

  // Call updateUrl whenever filters change
  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  const hasActiveFilters: boolean =
    !!searchQuery ||
    !!category ||
    !!manufacturer ||
    priceRange.min > 0 ||
    priceRange.max < 1000 ||
    sortBy !== 'newest' ||
    page > 1;

  const getApiParams = useCallback(() => {
    const params: Record<string, any> = {
      limit,
      page,
    };

    if (searchQuery) params.search = searchQuery;
    if (category) params.category = category;
    if (manufacturer) params.manufacturer = manufacturer;
    if (priceRange.min > 0) params.minPrice = priceRange.min;
    if (priceRange.max < 1000) params.maxPrice = priceRange.max;

    // Note: sorting should be handled in component if backend supports it
    // For now we'll apply it client-side if needed

    return params;
  }, [searchQuery, category, manufacturer, priceRange, page, limit]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setCategory('');
    setManufacturer('');
    setPriceRange(DEFAULT_PRICE_RANGE);
    setSortBy('newest');
    setPage(1);
    router.push('/explore');
  }, [router]);

  return {
    searchQuery,
    category,
    manufacturer,
    priceRange,
    sortBy,
    page,
    limit,

    setSearchQuery,
    setCategory,
    setManufacturer,
    setPriceRange,
    setSortBy,
    setPage,
    setLimit: () => {}, // Not implemented as limit is fixed

    clearFilters,
    hasActiveFilters,
    getApiParams,
  };
};

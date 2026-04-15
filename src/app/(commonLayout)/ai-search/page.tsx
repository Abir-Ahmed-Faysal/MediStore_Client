'use client';

import React, { useState, useEffect } from 'react';
import { useSmartSearch } from '@/hooks/useSmartSearch';
import { Search, Loader2, AlertCircle, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { SearchResult } from '@/types/ai.types';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function AISearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { results, suggestions, isLoading, error, hasSearched, search, getSuggestions, getTrending } = useSmartSearch();

  // Debounce search suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      if (searchQuery.length > 1) {
        getSuggestions(searchQuery);
        setShowSuggestions(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, getSuggestions]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setShowSuggestions(false);
    await search(query);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  const handleLoadTrending = async () => {
    await getTrending();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pt-8">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            AI-Powered Medicine Search
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 text-lg">
            Find the right medicine using our intelligent search powered by AI
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search for medicines, symptoms, or manufacturers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                className="pl-12 h-14 text-lg bg-white dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 rounded-xl"
              />
              {isLoading && (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 animate-spin" />
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10">
                <div className="p-3 space-y-2">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <Button
            onClick={() => handleSearch(searchQuery)}
            disabled={isLoading || !searchQuery.trim()}
            className="w-full mt-4 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Search with AI
              </>
            )}
          </Button>
        </div>

        {/* Trending Section (if no search) */}
        {!hasSearched && (
          <div className="max-w-2xl mx-auto mb-8">
            <button
              onClick={handleLoadTrending}
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              Show Trending Searches
            </button>
          </div>
        )}

        {/* Results Section */}
        <div className="max-w-4xl mx-auto">
          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-200">Search Error</h3>
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && <LoadingSpinner />}

          {/* No Results State */}
          {hasSearched && !isLoading && results.length === 0 && !error && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                No medicines found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try searching with different keywords or browse our full medicine catalog
              </p>
              <Link href="/explore">
                <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                  Browse All Medicines
                </Button>
              </Link>
            </div>
          )}

          {/* Results Grid */}
          {hasSearched && results.length > 0 && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Results ({results.length})
                </h2>
              </div>

              <div className="grid gap-4">
                {results.map((result, idx) => (
                  <div
                    key={result.id || idx}
                    className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-lg p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Title and Relevance Score */}
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            {result.name}
                          </h3>
                          {result.relevanceScore && (
                            <div className="inline-block">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                {Math.round(result.relevanceScore * 100)}% Match
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        {result.description && (
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-2">
                            {result.description}
                          </p>
                        )}

                        {/* Metadata */}
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                          {result.manufacturer && (
                            <div>
                              <span className="font-semibold">Manufacturer:</span> {result.manufacturer}
                            </div>
                          )}
                          {result.stock !== undefined && (
                            <div>
                              <span className="font-semibold">Stock:</span>{' '}
                              <span className={result.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                                {result.stock > 0 ? `${result.stock} available` : 'Out of stock'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Reasoning */}
                        {result.reasoning && (
                          <p className="text-xs text-slate-500 dark:text-slate-500 italic">
                            {result.reasoning}
                          </p>
                        )}
                      </div>

                      {/* Price and Button */}
                      <div className="text-right flex flex-col items-end gap-3">
                        {result.price && (
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            Rs. {parseFloat(result.price).toFixed(2)}
                          </div>
                        )}
                        <Link href={`/explore`}>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

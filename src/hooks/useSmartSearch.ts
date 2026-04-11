/**
 * useSmartSearch Hook
 * Manages AI-powered medicine search with suggestions and caching
 */

import { useState, useCallback, useEffect } from 'react';
import { aiService } from '@/services/ai.service';
import {
  SmartSearchResponse,
  SearchResult,
  SuggestionItem,
} from '@/types/ai.types';

interface UseSmartSearchReturn {
  results: SearchResult[];
  suggestions: SuggestionItem[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  search: (query: string) => Promise<void>;
  getSuggestions: (query: string) => Promise<void>;
  getTrending: () => Promise<void>;
  clear: () => void;
}

export function useSmartSearch(): UseSmartSearchReturn {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await aiService.smartSearch(query);
      setResults(response.results);
      setSuggestions(response.suggestions);
      setHasSearched(true);

      // Track search analytics
      await aiService.trackUsage('search', {
        query,
        resultsCount: response.results.length,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSuggestions = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const items = await aiService.getSearchSuggestions(query);
      setSuggestions(
        items.map((item) => ({
          text: item,
          type: 'medicine' as const,
        }))
      );
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  }, []);

  const getTrending = useCallback(async () => {
    try {
      const trending = await aiService.getTrendingSearches();
      setSuggestions(
        trending.map((item) => ({
          text: item,
          type: 'medicine' as const,
          trending: true,
        }))
      );
    } catch (err) {
      console.error('Error fetching trending:', err);
    }
  }, []);

  const clear = useCallback(() => {
    setResults([]);
    setSuggestions([]);
    setError(null);
    setHasSearched(false);
  }, []);

  return {
    results,
    suggestions,
    isLoading,
    error,
    hasSearched,
    search,
    getSuggestions,
    getTrending,
    clear,
  };
}

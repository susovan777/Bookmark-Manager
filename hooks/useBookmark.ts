// Path: hooks\useBookmark.ts

// A custom hook centralises all bookmark-related state and logic.
// This keeps page components clean — they just call this hook
// and get back data + handlers, no fetching logic in the component itself.
'use client';

import { Bookmark } from '@/types';
import axios, { AxiosError } from 'axios';
import { useDebounce } from 'use-debounce';
import { useState, useEffect, useCallback } from 'react';

export const useBookmarks = () => {
  // Master list — everything fetched from the server
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // What the user has typed in the search box
  const [searchInput, setSearchInput] = useState('');

  // Debounced version — only updates 400ms AFTER the user stops typing.
  // debouncedSearch lags behind searchInput by 400ms.
  const [debouncedSearch] = useDebounce(searchInput, 400);

  // isSearching: true only while the debounced API call is in-flight
  // separate from isLoading so the initial load and search feel different
  const [isSearching, setIsSearching] = useState(false);

  // --- Fetch bookmarks from server ---
  // useCallback memoises this function so it doesn't recreate on every render.
  // It only recreates when debouncedSearch changes.
  const fetchBookmarks = useCallback(async (query: string) => {
    try {
      // If we have a query, show searching state
      // If it's the initial empty load, show full loading state
      if (query) {
        setIsSearching(true);
      } else {
        setIsLoading(true);
      }

      const res = await axios.get<Bookmark[]>('/api/bookmarks', {
        // Only add the ?q= param when there's actually a query
        // axios omits params that are undefined
        params: query ? { q: query } : undefined,
      });

      setBookmarks(res.data);
      setError(null);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setError(error.response?.data?.error ?? 'Failed to load bookmarks');
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  }, []);

  // --- Initial load ---
  // Runs once when the hook first mounts
  useEffect(() => {
    fetchBookmarks('');
  }, [fetchBookmarks]);

  // --- Debounced search effect ---
  useEffect(() => {
    // Skip the initial mount — handled by the effect above
    // This only runs on subsequent changes to debouncedSearch
    fetchBookmarks(debouncedSearch);
  }, [debouncedSearch, fetchBookmarks]);

  // --- Local optimistic filter ---
  // While waiting for the debounced API call, we immediately filter
  // the already-loaded bookmarks client-side.
  // This makes search feel instant even before the server responds.

  // Example: user has 50 bookmarks loaded.
  // They type "git" → we instantly show only bookmarks matching "git"
  // → 400ms later the server responds and we update with accurate results.
  const displayedBookmarks = searchInput
    ? bookmarks.filter((b) => {
        const q = searchInput.toLowerCase();
        return (
          b.title.toLowerCase().includes(q) ||
          b.url.toLowerCase().includes(q) ||
          b.description?.toLowerCase().includes(q)
        );
      })
    : bookmarks; // When searchInput is empty, show everything — no filtering

  // --- Handlers ---
  const handleAdd = (bookmark: Bookmark) => {
    // Prepend to master list — appears at top immediately
    setBookmarks((prev) => [bookmark, ...prev]);
  };

  // Called by BookmarkCard after a successful delete.
  const handleDelete = (id: string) => {
    // We filter out the deleted bookmark from state — no need to re-fetch.
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  return {
    // Data
    bookmarks: displayedBookmarks, // ← filtered list for rendering
    totalCount: bookmarks.length, // ← unfiltered count for the header
    isLoading,
    isSearching,
    error,

    // Search
    searchInput,
    setSearchInput, // ← passed to the search input onChange

    // Handlers
    handleAdd,
    handleDelete,
  };
};

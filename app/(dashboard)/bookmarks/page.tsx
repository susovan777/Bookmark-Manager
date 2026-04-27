// Path: app\(dashboard)\bookmarks\page.tsx
'use client'

import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import BookmarkCard from '@/components/BookmarkCard'
import { Bookmark } from '@/types'
// Use our shared type instead of `any`

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  // `error` state lets us show a message if the fetch fails
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axios.get<Bookmark[]>('/api/bookmarks')
        // axios.get<Bookmark[]> tells TypeScript what shape the response is
        setBookmarks(res.data)
      } catch (err) {
        const error = err as AxiosError<{ error: string }>
        setError(error.response?.data?.error ?? 'Failed to load bookmarks')
      }
    }

    fetchBookmarks()
  }, [])

  // Called by BookmarkCard after a successful delete.
  // We filter out the deleted bookmark from state — no need to re-fetch.
  const handleDelete = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }

  // Show error if fetch failed
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium text-red-400">Something went wrong</p>
        <p className="text-sm text-white/40 mt-1">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">All Bookmarks</h2>
          {/* Show count only when bookmarks are loaded */}
          {bookmarks.length > 0 && (
            <p className="text-sm text-white/40 mt-0.5">
              {bookmarks.length} saved
            </p>
          )}
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-violet-400/10 flex items-center justify-center mb-4">
            <span className="text-2xl">🔖</span>
          </div>
          <p className="text-lg font-medium">No bookmarks yet</p>
          <p className="text-sm text-white/40 mt-1">
            Click "Add Bookmark" to save your first link
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              onDelete={handleDelete}
              // Pass handleDelete so the card can tell this page when it's deleted
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default BookmarkPage
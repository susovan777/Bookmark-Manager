// Path: hooks\useCollections.ts

// hooks/useCollections.ts
'use client'

import { Collection } from '@/types'
import axios, { AxiosError } from 'axios'
import { useState, useEffect, useCallback } from 'react'

export const useCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCollections = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await axios.get<Collection[]>('/api/collections')
      setCollections(res.data)
      setError(null)
    } catch (err) {
      const error = err as AxiosError<{ error: string }>
      setError(error.response?.data?.error ?? 'Failed to load collections')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCollections()
  }, [fetchCollections])

  const handleAdd = (collection: Collection) => {
    setCollections((prev) => [collection, ...prev])
  }

  const handleDelete = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id))
  }

  const handleUpdate = (updated: Collection) => {
    // Replace the old collection with the updated one in state
    setCollections((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    )
  }

  return {
    collections,
    isLoading,
    error,
    handleAdd,
    handleDelete,
    handleUpdate,
  }
}
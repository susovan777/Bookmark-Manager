'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

const Home = () => {
  const [url, setUrl] = useState('');
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  // Fetch bookmark
  const fetchBookmarks = async () => {
    const res = await fetch('/api/bookmarks');
    const data = await res.json();

    setBookmarks(data);
  };

  // Load bookmarks on first load
  useEffect(() => {
    fetchBookmarks();
  }, []);

  // Add Bookmark
  const handleAdd = async () => {
    if (!url) return;

    await fetch('/api/bookmarks', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });

    setUrl('');
    fetchBookmarks(); // refresh bookmark list
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Bookmarks</h1>

        <input
          placeholder="Search..."
          className="border px-3 py-2 rounded-lg w-64"
        />
      </div>

      {/* Input Section */}
      <div className="flex gap-2 mb-6">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste a link..."
          className="border p-2 mr-2"
        />
        <button onClick={handleAdd} className="bg-black text-white px-4 py-2">
          Add
        </button>
      </div>

      {/* Bookmark List */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="border rounded-lg p-4 hover:shadow transition"
          >
            <div className="flex items-center gap-2 mb-2">
              <img src={b.favicon} className="w-5 h-5" />
              <span className="font-medium">{b.title}</span>
            </div>

            <a
              href={b.url}
              target="_blank"
              className="text-sm text-muted-foreground"
            >
              {b.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

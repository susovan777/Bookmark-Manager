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
    <div className='max-w-3xl mx-auto py-10 px-4'>
      <h1 className='text-2xl font-semibold mb-6'>My Bookmarks</h1>

      {/* Input Section */}
      <div className='flex gap-2 mb-6'>
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
      <div className='grid gap-4'>
        {bookmarks.map((b) => (
          <Card key={b.id}>
            <CardContent className='flex items-center gap-3 p-4'>
              <img src={b.favicon} alt="" className="w-6 h-6" />
              <div className='flex flex-col'>
                <a href={b.url} target="_blank" className='font-medium hover:underline'>
                  {b.title}
                </a>

                <span className='text-sm text-muted-foreground'>{b.url}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;

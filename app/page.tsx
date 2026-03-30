'use client';

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
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        className="border p-2 mr-2"
      />
      <button onClick={handleAdd} className="bg-black text-white px-4 py-2">
        Add
      </button>

      <div>
        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="flex items-center gap-3 border p-3 rounded"
          >
            <img src={b.favicon} alt="" className="w-5 h-5" />
            <a href={b.url} target="_blank" className="text-blue-500">
              {b.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

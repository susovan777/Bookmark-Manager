// Path: types\index.ts

// Shared TypeScript types used across the app.
// Always define types here instead of using `any` — it autocompletes and catches bugs at compile time instead of runtime.

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  favicon: string | null;
  description: string | null;
  createdAt: string;
  userId: string;
  collectionId: string | null;
};

export type Collection = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null; // emoji icon e.g. "🎨"
  color: string | null; // tailwind color string e.g. "violet"
  createdAt: string;
  userId: string;
  _count?: {
    bookmarks: number; // how many bookmarks in this collection
  };
};

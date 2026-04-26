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
};

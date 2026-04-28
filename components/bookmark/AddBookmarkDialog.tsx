// Path: components\AddBookmarkForm.tsx

'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { Bookmark } from '@/types';
import axios, { AxiosError } from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Link2, Loader2, Plus, Sparkles, Type } from 'lucide-react';

type addBookmarkFormProps = {
  // Called after a bookmark is successfully created
  onAdd: (bookmark: Bookmark) => void;
};

// URLMetadata is what our /api/link-preview route returns
type URLMetadata = {
  title: string;
  deescription: string | null;
  favicon: string | null;
};

const AddBookmarkDialog = ({ onAdd }: addBookmarkFormProps) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  // isFetching: true while we auto-fetch metadata from the URL
  const [isFetching, setIsFetching] = useState(false);
  // isSaving: true while we POST to /api/bookmarks
  const [isSaving, setIsSaving] = useState(false);

  const [urlError, setUrlError] = useState('');

  // --- Auto-fetch metadata when URL field loses focus ---
  // When the user pastes a URL and tabs to the title field, automatically fetch the page title
  const handleUrlBlur = async () => {
    // Don't fetch if URL is empty or title already filled manually
    if (!url || title) return;

    // Basic URL validation before hitting the API
    try {
      new URL(url); // throws if invalid URL
    } catch {
      setUrlError('Please enter a valid URL (include https://)');
    }

    // setUrlError('');
    setIsFetching(true);

    try {
      const res = await axios.get<URLMetadata>('/api/link-preview', {
        params: { url }, // sends as ?url=https://...
      });

      // Auto-fill the title field with the fetched page title
      if (res.data.title) {
        setTitle(res.data.title);
      }
    } catch {
      // Silently fail — user can type title manually
      // Not every site supports Open Graph metadata
    } finally {
      setIsFetching(false);
    }
  };

  // --- Form submit → save bookmark to DB ---
  const handleAddBookmark = async (e: React.SubmitEvent) => {
    e.preventDefault();

    // Validate URL
    try {
      new URL(url);
    } catch {
      setUrlError('Please enter a valid URL (include https://)');
      return;
    }

    setUrlError('');
    setIsSaving(true);

    try {
      const res = await axios.post<Bookmark>('/api/bookmarks', {
        url,
        title: title || url, // fallback to URL if title is empty
      });

      // Tell the parent page about the new bookmark
      // so it appears in the list immediately without re-fetching
      onAdd(res.data);

      toast.success('Bookmark saved!');

      // Reset form and close dialog
      handleClose();
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error ?? 'Failed to save bookmark');
    } finally {
      setIsSaving(false);
    }
  };

  // Reset all state when dialog closes
  const handleClose = () => {
    setOpen(false);
    setUrl('');
    setTitle('');
    setUrlError('');
    setIsFetching(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => (v ? setOpen(true) : handleClose())}
    >
      {/* The button that opens the dialog */}
      {/* We render the trigger button here so it's self-contained */}
      <Button
        onClick={() => setOpen(true)}
        size="sm"
        className="bg-violet-600 hover:bg-violet-500 text-white font-medium gap-2 shadow-lg shadow-violet-500/20 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">Add Bookmark</span>
        <span className="sm:hidden">Add</span>
      </Button>

      <DialogContent
        className="
          bg-[#111111] border border-white/10 text-white sm:max-w-md
          [&>button]:text-white/40 [&>button]:hover:text-black
        "
        // [&>button] targets the default shadcn close (X) button
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <Link2 className="w-3.5 h-3.5 text-violet-400" />
            </div>
            Add Bookmark
          </DialogTitle>
          <DialogDescription className="text-white/40 text-sm">
            Paste a URL — we'll fetch the title automatically.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAddBookmark} className="space-y-4 mt-2">
          {/* URL field */}
          <div className="space-y-1.5">
            <Label htmlFor="url" className="text-sm text-white/70">
              URL <span className="text-red-400">*</span>
            </Label>
            <div className="relative">
              <Input
                id="url"
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (urlError) setUrlError('');
                }}
                onBlur={handleUrlBlur}
                // onBlur fires when the input loses focus —
                // this is when we trigger the auto-fetch
                required
                disabled={isSaving}
                className="
                  bg-white/5 border-white/10 text-white
                  placeholder:text-white/20
                  focus-visible:ring-violet-500/50
                  focus-visible:border-violet-500/50
                  disabled:opacity-50 pr-9
                "
              />
              {/* Spinner shown while fetching metadata */}
              {isFetching && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-violet-400" />
              )}
            </div>

            {/* Inline URL error message */}
            {urlError && (
              <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                {urlError}
              </p>
            )}
          </div>

          {/* Title field */}
          <div className="space-y-1.5">
            <Label
              htmlFor="title"
              className="text-sm text-white/70 flex items-center gap-1.5"
            >
              <Type className="w-3.5 h-3.5" />
              Title
              <span className="text-white/30 text-xs font-normal">
                (auto-filled)
              </span>
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Page title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSaving || isFetching}
              className="
                bg-white/5 border-white/10 text-white
                placeholder:text-white/20
                focus-visible:ring-violet-500/50
                focus-visible:border-violet-500/50
                disabled:opacity-50
              "
            />
            {/* Hint shown while fetching */}
            {isFetching && (
              <p className="text-xs text-violet-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Fetching page title...
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            {/* Cancel button */}
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={isSaving}
              className="flex-1 text-white/60 hover:text-white hover:bg-white/5 border border-white/10"
            >
              Cancel
            </Button>

            {/* Save button */}
            <Button
              type="submit"
              disabled={isSaving || isFetching || !url}
              className="flex-1 bg-violet-500 hover:bg-violet-400 text-white shadow-lg shadow-violet-500/20 disabled:opacity-50"
            >
              {isSaving ? (
                // Show spinner while saving
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                'Save Bookmark'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookmarkDialog;

// Path: components\bookmark\EditBook,arkDialog.tsx
'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Pencil, Loader2, KeyRound, Type, Link2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bookmark } from '@/types';

type EditBookmarkDialogProps = {
  bookmark: Bookmark;
  // onUpdate tells the parent (BookmarkCard → BookmarkPage via context)
  // about the updated data so UI reflects changes instantly
  onUpdate: (updated: Bookmark) => void;
};

const EditBookmarkDialog = ({
  bookmark,
  onUpdate,
}: EditBookmarkDialogProps) => {
  const [open, setOpen] = useState(false);

  // Pre-fill fields with current bookmark values
  const [title, setTitle] = useState(bookmark.title);
  const [url, setUrl] = useState(bookmark.url);
  const [note, setNote] = useState(bookmark.note ?? '');

  const [isSaving, setIsSaving] = useState(false);
  const [urlError, setUrlError] = useState('');

  const handleSubmit = async (e: React.SubmitEvent) => {
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
      // PATCH — only sends changed fields
      const res = await axios.patch<Bookmark>(`/api/bookmarks/${bookmark.id}`, {
        title: title.trim() || bookmark.url,
        url: url.trim(),
        note: note.trim() || null,
      });

      // Tell the parent the bookmark changed — updates shared context state
      onUpdate(res.data);
      toast.success('Bookmark updated!');
      setOpen(false);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error ?? 'Failed to update bookmark');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    // Reset fields back to current bookmark values when closing without saving
    setTitle(bookmark.title);
    setUrl(bookmark.url);
    setNote(bookmark.note ?? '');
    setUrlError('');
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => (v ? setOpen(true) : handleClose())}
    >
      {/* Small edit icon button — shown inside BookmarkCard */}
      <button
        onClick={() => setOpen(true)}
        className="w-7 h-7 flex items-center justify-center rounded-md text-white/20 hover:text-violet-400 hover:bg-violet-400/5 transition-colors"
        aria-label="Edit bookmark"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>

      <DialogContent className="bg-[#111111] border border-white/10 text-white sm:max-w-md [&>button]:text-white/40 [&>button]:hover:text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <Pencil className="w-3.5 h-3.5 text-violet-400" />
            </div>
            Edit Bookmark
          </DialogTitle>
          <DialogDescription className="text-white/40 text-sm">
            Update the title, URL, or your login note.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* URL */}
          <div className="space-y-1.5">
            <Label
              htmlFor="edit-url"
              className="text-sm text-white/70 flex items-center gap-1.5"
            >
              <Link2 className="w-3.5 h-3.5" />
              URL
            </Label>
            <Input
              id="edit-url"
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (urlError) setUrlError('');
              }}
              disabled={isSaving}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-violet-500/50 disabled:opacity-50"
            />
            {urlError && <p className="text-xs text-red-400">{urlError}</p>}
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <Label
              htmlFor="edit-title"
              className="text-sm text-white/70 flex items-center gap-1.5"
            >
              <Type className="w-3.5 h-3.5" />
              Title
            </Label>
            <Input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSaving}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-violet-500/50 disabled:opacity-50"
            />
          </div>

          {/* Note / Login ID */}
          <div className="space-y-1.5">
            <Label
              htmlFor="edit-note"
              className="text-sm text-white/70 flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" />
              Login / Note
              <span className="text-white/30 text-xs font-normal">
                (optional)
              </span>
            </Label>
            <Input
              id="edit-note"
              type="text"
              placeholder="e.g. Signed up with john@gmail.com"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={isSaving}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-violet-500/50 disabled:opacity-50"
            />
            <p className="text-xs text-white/20">
              Store which account you used — only visible to you
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={isSaving}
              className="flex-1 text-white/60 hover:text-white hover:bg-white/5 border border-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving || !url.trim()}
              className="flex-1 bg-violet-500 hover:bg-violet-400 text-white shadow-lg shadow-violet-500/20 disabled:opacity-50"
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookmarkDialog;

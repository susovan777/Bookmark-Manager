// Path: components\collection\AddCollectionDialog.tsx

'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';
import { FolderPlus, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Collection } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

// Quick emoji options for the collection icon
// User picks one — stored as a string in the DB
const EMOJI_OPTIONS = [
  '📁',
  '🎨',
  '💻',
  '📚',
  '🔧',
  '🎯',
  '🚀',
  '💡',
  '🌐',
  '🎵',
  '📝',
  '⭐',
];

type AddCollectionDialogProps = {
  onAdd: (collection: Collection) => void;
};

const AddCollectionDialog = ({ onAdd }: AddCollectionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('📁');
  const [isSaving, setIsSaving] = useState(false);
  const [nameError, setNameError] = useState('');

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setNameError('Collection name is required');
      return;
    }

    setNameError('');
    setIsSaving(true);

    try {
      const res = await axios.post<Collection>('/api/collections', {
        name: name.trim(),
        description: description.trim() || null,
        icon: selectedIcon,
      });

      onAdd(res.data);
      toast.success(`Collection "${res.data.name}" created!`);
      handleClose();
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error ?? 'Failed to create collection');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setDescription('');
    setSelectedIcon('📁');
    setNameError('');
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => (v ? setOpen(true) : handleClose())}
    >
      <Button
        onClick={() => setOpen(true)}
        size="sm"
        className="bg-violet-600 hover:bg-violet-500 text-white font-medium gap-2 shadow-lg shadow-violet-500/20 cursor-pointer"
      >
        <FolderPlus className="w-4 h-4" />
        <span className="hidden sm:inline">New Collection</span>
        <span className="sm:hidden">New</span>
      </Button>

      <DialogContent className="bg-[#111111] border border-white/10 text-white sm:max-w-md [&>button]:text-white/40 [&>button]:hover:text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <FolderPlus className="w-3.5 h-3.5 text-violet-400" />
            </div>
            New Collection
          </DialogTitle>
          <DialogDescription className="text-white/40 text-sm">
            Group your bookmarks into organised collections.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Emoji icon picker */}
          <div className="space-y-1.5">
            <Label className="text-sm text-white/70">Icon</Label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedIcon(emoji)}
                  className={`
                    w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all
                    ${
                      selectedIcon === emoji
                        ? // Highlight selected emoji with violet ring
                          'bg-violet-500/20 ring-2 ring-violet-500 scale-110'
                        : 'bg-white/5 hover:bg-white/10'
                    }
                  `}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Collection name */}
          <div className="space-y-1.5">
            <Label htmlFor="collection-name" className="text-sm text-white/70">
              Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="collection-name"
              type="text"
              placeholder="e.g. Design Inspiration"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError('');
              }}
              disabled={isSaving}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-violet-500/50 disabled:opacity-50"
            />
            {nameError && <p className="text-xs text-red-400">{nameError}</p>}
          </div>

          {/* Optional description */}
          <div className="space-y-1.5">
            <Label htmlFor="collection-desc" className="text-sm text-white/70">
              Description
              <span className="text-white/30 text-xs font-normal ml-1">
                (optional)
              </span>
            </Label>
            <Input
              id="collection-desc"
              type="text"
              placeholder="What's this collection for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSaving}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-violet-500/50 disabled:opacity-50"
            />
          </div>

          {/* Action buttons */}
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
              disabled={isSaving || !name.trim()}
              className="flex-1 bg-violet-500 hover:bg-violet-400 text-white shadow-lg shadow-violet-500/20 disabled:opacity-50"
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </span>
              ) : (
                'Create Collection'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCollectionDialog;

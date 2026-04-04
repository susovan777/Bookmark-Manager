'use client';

import axios from 'axios';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';

type Bookmark = { id: string; title: string; url: string; favicon: string };

const BookmarkCard = ({ bookmark }: { bookmark: Bookmark }) => {
  const router = useRouter();

  const handleDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await axios.delete(`/api/bookmarks/${bookmark.id}`);
      toast('Bookmark deleted', { position: 'bottom-right' });
    } catch (error) {
      console.error('Failed to delete bookmark:', error);
      toast.error('Failed to delete bookmark');
    }

    // Refresh the current page
    router.refresh();
  };

  return (
    <Card className="relative rounded-sm cursor-pointer group hover:shadow-md hover:-translate-y-1 transition-all duration-200 hover:scale-[1.02]">
      {/* Menu icon */}
      <div className="absolute top-3 right-3 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardContent className="p-4">
        <Link
          href={bookmark.url}
          target="_blank"
          className="flex items-start gap-3"
        >
          {/* Favicon */}
          <img
            src={bookmark.favicon}
            alt={bookmark.title}
            className="w-10 h-10 rounded-md"
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium truncate">{bookmark.title}</h3>
            <p className="text-xs text-muted-foreground truncate">
              {bookmark.url}
            </p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BookmarkCard;

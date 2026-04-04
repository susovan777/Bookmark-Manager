import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

type Bookmark = { id: string; title: string; url: string; favicon: string };

const BookmarkCard = ({ bookmark }: { bookmark: Bookmark }) => {
  return (
    <Link href={bookmark.url} target="_blank">
      <Card className="cursor-pointer hover:shadow-md hover:scale-[1.02] transition">
        <CardContent className="p-4 flex items-start gap-3">
          {/* Favicon */}
          <img
            src={bookmark.favicon}
            alt={bookmark.title}
            className="w-10 h-10 rounded-md"
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{bookmark.title}</h3>
            <p className="text-small text-muted-foreground truncate">
              {bookmark.url}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookmarkCard;

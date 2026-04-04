import BookmarkCard from '../components/bookmark-card';

const bookmarks = [
  {
    id: '1',
    title: 'GitHub',
    url: 'https://github.com',
    favicon: 'https://www.google.com/s2/favicons?sz=64&domain_url=github.com',
  },
  {
    id: '2',
    title: 'YouTube',
    url: 'https://youtube.com',
    favicon: 'https://www.google.com/s2/favicons?sz=64&domain_url=youtube.com',
  },
];

const BookmarkPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">All Bookmarks</h2>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium">No bookmarks yet</p>
          <p className="text-sm text-muted-foreground">
            Start adding your favorite links 🚀
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;

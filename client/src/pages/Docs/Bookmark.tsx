import  { useEffect, useState } from 'react';
import { Bookmark, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BookmarkedSteps = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);


  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bankingBookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Bookmark className="h-8 w-8 text-yellow-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Bookmarked Steps
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400">
              No bookmarked steps yet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((bookmarkId) => (
              <div
                key={bookmarkId}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {bookmarkId
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkedSteps;
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            {/* Back Button Skeleton */}
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-8"></div>

            {/* Article Header Skeleton */}
            <div className="bg-white dark:bg-card rounded-2xl overflow-hidden shadow-lg mb-12">
              <div className="aspect-[21/9] bg-gray-200 dark:bg-gray-800"></div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
                </div>

                <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-6"></div>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                    <div>
                      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                </div>
              </div>
            </div>

            {/* Author Bio Skeleton */}
            <div className="bg-white dark:bg-card rounded-xl p-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                <div>
                  <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                  <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
                </div>
              </div>
            </div>

            {/* Related Posts Skeleton */}
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white dark:bg-card rounded-xl overflow-hidden shadow-lg">
                  <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-800"></div>
                  <div className="p-6">
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}